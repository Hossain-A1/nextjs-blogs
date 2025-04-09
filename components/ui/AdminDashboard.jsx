"use client";
import { useFetch } from "@/lib/swr";

import axios from "axios";
import toast from "react-hot-toast";
import React, { useState } from "react";
import AddBlog from "./AddBlog";
import ListBlog from "./ListBlog";
import AddNews from "./AddNews";
import ListNews from "./ListNews";
import CreatedBlog from "./CreatedBlog";
import CreatedNews from "./CreatedNews";
import { mutate } from "swr";

const AdminDashboard = () => {
  const { data, error, isLoading } = useFetch("/api/blog");

  const [activeTab, setActiveTab] = useState("add-blog");
  const [isUpId, setIsUpId] = useState(null);
  console.log(isUpId);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  // form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/blog", formData, {
        headers: { "Content-Type": "application/json" },
      });
      mutate("/api/blog");
      const { data } = res;

      if (data.success) {
        setFormData({
          title: "",
          description: "",
          image: "",
        });

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUpdateBlog = async () => {
    try {
      const res = await axios.put(`/api/blog/${isUpId}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      mutate("/api/blog");
      const { data } = res;

      if (data.success) {
        setFormData({
          title: "",
          description: "",
          image: "",
        });
        setIsUpId(null);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      const res = await axios.delete(`/api/blog/${id}`);
      mutate("/api/blog");
      const { data } = res;

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "add-blog":
        return (
          <AddBlog
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            handleUpdateBlog={handleUpdateBlog}
            isUpId={isUpId}
          />
        );
      case "list-blogs":
        return <ListBlog />;
      case "add-news":
        return <AddNews />;
      case "list-news":
        return <ListNews />;
      default:
        return <AddBlog />;
    }
  };

  const renderRightComponent = () => {
    switch (activeTab) {
      case "add-blog":
        return (
          <CreatedBlog
            blogs={data}
            error={error}
            lodaing={isLoading}
            setFormData={setFormData}
            setIsUpId={setIsUpId}
            handleDeleteBlog={handleDeleteBlog}
          />
        );
      case "add-news":
        return <CreatedNews />;
      default:
        return null;
    }
  };

  const showRightSection = activeTab === "add-blog" || activeTab === "add-news";

  return (
    <div className='flex flex-col lg:flex-row h-screen w-full '>
      {/* Sidebar */}
      <aside className='w-full lg:w-1/6 bg-gray-100 p-4'>
        <ul className='flex lg:flex-col justify-between font-medium text-xl'>
          <li
            onClick={() => setActiveTab("add-blog")}
            className='hover:text-violet-600 hover:bg-gray-200 py-2 px-3 rounded duration-300 cursor-pointer'
          >
            Add blog ➕
          </li>
          <li
            onClick={() => setActiveTab("list-blogs")}
            className='hover:text-violet-600 hover:bg-gray-200 py-2 px-3 rounded duration-300 cursor-pointer'
          >
            List blog 📃
          </li>
          <li
            onClick={() => setActiveTab("add-news")}
            className='hover:text-violet-600 hover:bg-gray-200 py-2 px-3 rounded duration-300 cursor-pointer'
          >
            Add news ➕
          </li>
          <li
            onClick={() => setActiveTab("list-news")}
            className='hover:text-violet-600 hover:bg-gray-200 py-2 px-3 rounded duration-300 cursor-pointer'
          >
            List news 📃
          </li>
        </ul>
      </aside>

      {/* Main content area */}
      <div className='flex flex-col lg:flex-row w-full'>
        {/* Left section */}
        <section
          className={`w-full p-4 overflow-hidden ${
            showRightSection ? "lg:w-3/5" : "lg:w-full"
          }`}
        >
          {renderActiveComponent()}
        </section>

        {/* Right section */}
        {showRightSection && (
          <section className='w-full lg:w-2/5 p-4 bg-gray-50 overflow-y-scroll'>
            {renderRightComponent()}
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
