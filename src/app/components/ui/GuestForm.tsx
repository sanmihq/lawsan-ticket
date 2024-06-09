"use client";

import { spaceMono } from "@/app/fonts";
import { DownloadButton, TicketPDF } from "./Ticket";
import { ChangeEvent, useRef, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";

export default function GuestForm() {
  const titles = ["Mr", "Ms", "Mrs"];

  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [email, setEmail] = useState("");
  const [seat, setSeat] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ticketRef = useRef<HTMLDivElement | null>(null);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSeat(null);

    console.log({
      title,
      firstName,
      lastName,
      matricNumber,
      email,
    });

    try {
      const response = await fetch("/api/assign-seat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          firstName,
          lastName,
          matricNumber,
          email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSeat(data.seat);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="text-left w-full">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <Select
            isRequired
            label="Title"
            labelPlacement="outside"
            placeholder="Choose your title"
            value={title}
            onChange={handleSelectChange}
            className="w-full md:w-1/2 md:pr-5"
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
            isDisabled={loading}
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
            {loading ? "Finding Seat..." : "Find Seat"}
          </Button>
          {/* <Button
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
            className="w-1/2 font-bold"
          >
            Download Ticket
          </Button> */}

          {seat && (
            <div className="w-1/2">
              <PDFDownloadLink
                document={
                  <TicketPDF
                    ticket={{
                      title,
                      firstName,
                      lastName,
                      matricNumber,
                      email,
                      seat,
                    }}
                  />
                }
                fileName="lawsan-ticket.pdf"
              >
                {({ loading }) => (
                  <Button
                    size="md"
                    color="secondary"
                    isDisabled={loading}
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
                    className="font-bold"
                  >
                    {loading ? "Generating PDF..." : "Download Ticket"}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          )}
        </div>
      </form>
      {error && (
        <div className="text-xs text-red-400 text-center mt-4">
          Oh no 😯, {error} Please try again.
        </div>
      )}
      {seat && (
        <p className="text-sm text-center mt-4">
          You will be seated at the{" "}
          <span className={`${spaceMono.className} font-black`}>{seat}'s</span>{" "}
          side
        </p>
      )}
      <p className="text-xs text-center text-gray-400 mt-6">
        By submitting, you agree that your data is being stored.
      </p>
      <p className="text-xs text-center text-red-400 mt-2">
        Note: Due to possible cold starts, it may take a few moments for the
        server to respond. If you encounter a server error, please click the
        "Find Seat" button again.
      </p>
    </section>
  );
}
