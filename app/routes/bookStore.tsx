import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'

const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxYmlidHNqdm53YnN3aGRhdnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4Mzk2MTMsImV4cCI6MjA1ODQxNTYxM30.gmHyKDImQdmJVUVxSCDnMam7WXldc6C-reGkt_4kMWE'
const supabase = createClient(
  'https://gqbibtsjvnwbswhdavwx.supabase.co',
  key
);



const BookUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading]  = useState(false)
  const [userId, setUserId]  = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(()=> {
    async function fetchUser() {
      const { 
        data: { user }, 
      } = await supabase.auth.getUser();
    if (user) setUserId(user.id);

    const {data: categoriesData, error} = await supabase
      .from("categories")
      .select("*");
    if (error) console.error("error fetching categories", error);
    else setCategories(categoriesData)
  }
  fetchUser();
}, []);
  
  console.log(userId)
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }
  
  const uploadBook = async() => {
    
    if (!file || !userId) return alert('please select a file and log in')
    setUploading(true);

    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`
    const filepath = `books/${fileName}`


    const {data, error}  = await supabase.storage
    .from('books')
    .upload(filepath,file);

    if (error) {
      console.error("Upload error:", error.message)
      alert("book upload failed" + error.message + error.cause + error.stack )
      setUploading(false)
      return
    }

    const { data: publicUrl } = supabase.storage
      .from("books")
      .getPublicUrl(filepath)
      
    const {error: dbError } = await supabase.from("books").insert([
      {
        user_id: userId,
        title: file.name,
        file_url: publicUrl.publicUrl,
        category_id: selectedCategory,
        created_at: new Date().toISOString(),
      },
    ]);
    
    if (dbError) {
      console.error("database error:", dbError)
      alert("failed to usave file url to database")
    } else {
      alert("upload successful!");
    }
    setUploading(false);
  };

  return(
    <div>
      <input type="file" onChange={handleFileChange}/>

      <select name="" value={selectedCategory} onChange={handleCategoryChange} id="">
        <option value="">select catag</option>
        {categories.map((catag)=> (
          <option key={catag.id} value={catag.id}>
            {catag.name}
          </option>
        ))}
      </select>

      <button onClick={uploadBook} disabled={uploading || !userId}>
        {uploading ? "Uploading..." : "Upload Book"}
      </button>
    </div>
  )
 
}

export default BookUpload;
