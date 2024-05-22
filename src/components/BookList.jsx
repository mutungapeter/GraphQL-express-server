import React, { useState } from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";

import GET_BOOKS from "../getBooks";
const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="flex flex-col gap-10">
      {data.books.map((book, index) => (
        <div
          key={index}
          className="gap-5 border p-5 rounded-md shadow-md bg-white"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:justify-between p-10">
            <div className="flex flex-col items-start ">
              <span className="text-lg bg-blue-100 p-0 px-3 rounded-md mt-1 text-center text-blue-500 font-semibold">
                Title
              </span>
              <span className="text-3xl font-bold">{book.title}</span>
            </div>
            <div className="flex flex-col items-start ">
              <span className="text-lg bg-blue-100 p-0 px-3 rounded-md mt-1 text-center text-blue-500 font-semibold">
                Author
              </span>
              <span className="text-3xl font-bold">{book.author}</span>
            </div>
          </div>
          <BookPages pages={book.pages} className="mt-16" />
        </div>
      ))}
    </div>
  );
};
export default BookList;
const BookPages = ({ pages }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedToken, setSelectedToken] = useState(null);

  const handleNextPage = () => {
    if (currentPage < pages.length - 2) {
      setCurrentPage(currentPage + 2);
      setSelectedToken(null); // Reset selected token when navigating to next page
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 2);
      setSelectedToken(null); // Reset selected token when navigating to previous page
    }
  };

  const handleTokenClick = (tokenValue) => {
    setSelectedToken(tokenValue);
  };

  return (
    <>
      <div className="flex justify-between gap-3 rounded-md">
        <div className="left-page bg-slate-200 p-4 tracking-wide cursor-pointer rounded-md flex-grow overflow-auto">
          {pages[currentPage]?.content.split("").map((char, index) => {
            const token = pages[currentPage].tokens.find(
              (token) =>
                token.position[0] <= index && token.position[1] >= index
            );
            return (
              <span
                key={index}
                onClick={() => handleTokenClick(token)}
                className={token ? "word-with-token" : "word"}
              >
                {char}
              </span>
            );
          })}
        </div>
        <div className="right-page bg-slate-100 p-4 tracking-wide cursor-pointer rounded-md flex-grow overflow-auto">
          {pages[currentPage + 1]?.content.split("").map((char, index) => {
            const token = pages[currentPage + 1].tokens.find(
              (token) =>
                token.position[0] <= index && token.position[1] >= index
            );
            return (
              <span
                key={index}
                onClick={() => handleTokenClick(token)}
                className={token ? "word-with-token" : "word"}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center mt-10 gap-8">
        <button
          className="bg-gray-500 text-white"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white"
          onClick={handleNextPage}
          disabled={currentPage >= pages.length - 2}
        >
          Next
        </button>
      </div>
      {selectedToken && (
        <div className="mt-4 flex  justify-end ">
          <div className="flex flex-col p-3 border rounded-md  bg-white shadow-md">
            <p className="text-md text-blue-500 font-bold text-2xl">
              Word:
              <span className="text-red-700 ml-2 text-xl">
                {selectedToken.value}
              </span>
            </p>
            {selectedToken.position && (
              <p className="text-blue-500 text-2xl font-bold">
                Position:
                <span className="text-black font-bold text-xl ml-2">
                  {selectedToken.position.join("-")}
                </span>
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
