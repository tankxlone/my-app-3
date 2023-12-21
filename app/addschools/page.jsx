"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

const SchoolForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  const formData = new FormData();

  async function formSubmit(data) {
    try {
      setIsLoading(true);
      // Create a FormData object to send the image
      if (image !== null) {
        formData.append("image", image);
      } else {
        console.error("Image is null");
      }
      // Send the image to the server using fetch
      const response = await fetch("/api/img", {
        method: "POST",
        body: formData,
      });
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const responseData = await response.json();
      const imageUrl = responseData.imageUrl;

      const schoolData = { ...data, imageUrl };

      const addingData = await fetch("/api/addschool", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schoolData),
      });
      if (!addingData.ok) {
        throw new Error("Failed to upload image");
      }
      reset();
    } catch (error) {
      console.error("Error uploading image:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="font-semibold text-2xl m-4 text-gray-900">Add School</h1>
        <Link href={"/showschools"}>
          <div className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Show Schools
          </div>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="max-w-md mx-auto mt-5"
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Name must only contain letters",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name?.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("address", {
              required: "Address is required",
            })}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-2">
              A valid address is required.
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            placeholder="City"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("city", {
              required: "City is required",
            })}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-2">
              A valid city is required.
            </p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="state"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            placeholder="State"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("state", {
              required: "State is required",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "State must only contain letters",
              },
            })}
          />
          {errors.state?.message && (
            <p className="text-red-500 text-sm mt-2">{errors.state?.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="contact"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Contact
          </label>
          <input
            type="number"
            id="contact"
            placeholder="Contact"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("contact", {
              required: "Contact is required",
              pattern: {
                value: /^[0-9]+$/i,
                message: "Contact must only contain numbers",
              },
            })}
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-2">
              {errors.contact?.message}
            </p>
          )}
        </div>

        {/* Image upload field */}
        <div className="mb-5">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*" // Specify accepted file types (images in this case)
            onChange={handleImageChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-2">
              Please upload a valid image.
            </p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="hey@example.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">
              A valid email is required.
            </p>
          )}
        </div>

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default SchoolForm;
