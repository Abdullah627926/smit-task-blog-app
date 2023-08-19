import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Button, Popconfirm } from "antd";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/service/firebase";
import { useAuth } from "@/hooks";
import EditModal from "@/pages/editmodal";

const Allblogs = () => {
  const [data, setData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const { user } = useAuth();
  console.log(user)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs")); // Replace "posts" with your collection name

        const postData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(postData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, "blogs", postId));
      setData(data.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setEditModalVisible(true);
  };


  const handleSaveEdit = async (postId, updatedData) => {
    try {
      await updateDoc(doc(db, 'blogs', postId), updatedData);

      // Update the UI with the edited data
      const updatedPosts = data.map((post) => (post.id === postId ? { ...post, ...updatedData } : post));
      setData(updatedPosts);

      setEditModalVisible(false);
      setSelectedPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setSelectedPost(null);
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-10">
        <Typography.Title>All Blogs</Typography.Title>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-30">
        {data.map((post) => (
          <Card key={post.id} className="rounded-md shadow-md border">
            <Card.Meta
              avatar={<Avatar src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" />}
              title={post.title}
              description={post.description}
            />
            <Popconfirm
              okText="ok"
              cancelText="cance"
              onConfirm={() => handleDelete(post.id)}
              title="Are you sure you want to delete the blog"
            >
              <Button type="link">Delete</Button>
            </Popconfirm>
            <Button type="link" onClick={() => handleEdit(post)}>Edit</Button>
          </Card>
        ))}
      </div>
      <EditModal
        post={selectedPost}
        visible={editModalVisible}
        onCancel={handleCancelEdit}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Allblogs;