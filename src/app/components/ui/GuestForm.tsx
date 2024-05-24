"use client";

import { ChangeEvent, useState } from "react";
import { spaceMono } from "@/app/fonts";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

export default function GuestForm() {
  const titles = ["Mr", "Ms", "Mrs"];

  const [photo, setPhoto] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [email, setEmail] = useState("");
  const [seat, setSeat] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo) {
      setError("Photo is required");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onloadend = async () => {
      const photoBase64 = reader.result?.toString().split(",")[1];

      console.log({
        photo: photoBase64,
        title,
        firstName,
        lastName,
        matricNumber,
        email,
      });
    };
  };

  return (
    <section className="text-left w-full">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <div className="w-full md:w-1/2">
            <label
              className="block mb-2 text-sm text-black"
              htmlFor="file_input"
            >
              Upload photo
            </label>
            <input
              required
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            />
            <p
              className="mt-1 text-xs text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p>
          </div>
          <Select
            isRequired
            label="Title"
            labelPlacement="outside"
            placeholder="Choose your title"
            value={title}
            onChange={handleSelectChange}
            className="w-full md:w-1/2"
          >
            {titles.map((title) => (
              <SelectItem key={title} value={title}>
                {title}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <Input
            isRequired
            type="text"
            name="firstName"
            label="First name"
            labelPlacement="outside"
            placeholder="Rachael"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full md:w-1/2"
          />
          <Input
            isRequired
            type="text"
            name="lastName"
            label="Last name"
            labelPlacement="outside"
            placeholder="Smith"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full md:w-1/2"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-start md:space-x-10 gap-y-5 md:gap-y-0">
          <Input
            isRequired
            type="text"
            name="matricNumber"
            label="Matric number"
            labelPlacement="outside"
            placeholder="24ADSK56JAL"
            description="This will be used to generate your barcode"
            value={matricNumber}
            onChange={(e) => setMatricNumber(e.target.value)}
            className="w-full md:w-1/2"
          />
          <Input
            isRequired
            type="email"
            name="email"
            label="Email address"
            labelPlacement="outside"
            placeholder="rachaelsmith@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-1/2"
          />
        </div>

        <div
          className={`${spaceMono.className} flex items-center gap-5 md:gap-10 w-full md:w-4/5 mx-auto`}
        >
          <Button
            size="md"
            color="secondary"
            type="submit"
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
              </svg>
            }
            className="w-1/2 font-bold"
          >
            Find Seat
          </Button>
          <Button
            size="md"
            color="secondary"
            isDisabled={!seat}
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <path d="M232,104a8,8,0,0,0,8-8V64a16,16,0,0,0-16-16H32A16,16,0,0,0,16,64V96a8,8,0,0,0,8,8,24,24,0,0,1,0,48,8,8,0,0,0-8,8v32a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V160a8,8,0,0,0-8-8,24,24,0,0,1,0-48ZM32,167.2a40,40,0,0,0,0-78.4V64H88V192H32Zm192,0V192H104V64H224V88.8a40,40,0,0,0,0,78.4Z"></path>
              </svg>
            }
            // onClick={handleDownload}
            className="w-1/2 font-bold"
          >
            Download Ticket
          </Button>
        </div>
      </form>
      <p className="text-xs text-center text-gray-400 mt-6">
        By submitting, you agree that your data is being stored.
      </p>
      {seat && <span>You will be seated at the {seat} side</span>}
      {error && <span className="text-red-500">{error}</span>}
    </section>
  );
}
