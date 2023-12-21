"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SchoolCard } from "@/components/SchoolCard";
import { SyncLoader } from "react-spinners";
import Link from "next/link";
const page = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("/api/allschool");
        if (response.status === 200) {
          setSchools(response.data);
        } else {
          console.error("Failed to fetch schools:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching schools:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center ">
        <h1 className=" text-gray-900 font-semibold text-3xl m-5">
          All Schools
        </h1>
        <Link href={"/addschools"}>
          <div className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Add School
          </div>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader color="#36d7b7" />
        </div>
      ) : schools.length > 0 ? (
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {schools.map((school, i) => (
              <SchoolCard key={i} school={school} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-red-500 font-bold text-center">
            Nothing to show at the moment.
          </p>
        </div>
      )}
    </>
  );
};

export default page;
