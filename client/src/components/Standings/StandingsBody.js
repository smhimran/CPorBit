import axios from "axios";
import React, { useEffect, useState } from "react";

function StandingsBody() {
  const [people, setPeople] = useState([]);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);
  const [current, setCurrent] = useState(null);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [search, setSearch] = useState("");

  const [pages, setPages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const getSearch = (e) => {
    if (e.key === "Enter") {
      setIsLoading(true);

      axios
        .get(`/api/standings/?search=${search}`)
        .then((res) => {
          setPeople(res.data.results);
          const c = Number(res.data.current);
          setCurrent(c);
          setPrevious(c - 1);
          setNext(c + 1);
          setHasPrevious(c > 1);
          setHasNext(c < Number(res.data.last_page));
          setIsLoading(false);

          let newPages = [];

          let x = (current - 1) / 10;

          x = x < 1 ? 0 : x;

          let startingPage = x + 1;

          console.log(c, next);
          for (
            let i = startingPage;
            i <= Math.min(res.data.last_page, startingPage + 10);
            i++
          ) {
            newPages.push(i);
          }

          setPages(newPages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getPage = (pageNumber) => {
    setIsLoading(true);

    axios
      .get(`/api/standings/?search=${search}&page=${pageNumber}`)
      .then((res) => {
        setPeople(res.data.results);
        const c = Number(res.data.current);
        setCurrent(c);
        setPrevious(c - 1);
        setNext(c + 1);
        setHasPrevious(c > 1);
        setHasNext(c < Number(res.data.last_page));
        setIsLoading(false);

        let newPages = [];

        let x = (current - 1) / 10;

        x = x < 1 ? 0 : x;

        let startingPage = x + 1;

        console.log(c, next);
        for (
          let i = startingPage;
          i <= Math.min(res.data.last_page, startingPage + 10);
          i++
        ) {
          newPages.push(i);
        }

        setPages(newPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/standings/")
      .then((res) => {
        setPeople(res.data.results);
        const c = Number(res.data.current);
        setCurrent(c);
        setPrevious(c - 1);
        setNext(c === Number(res.data.last_page) ? null : c + 1);
        setHasPrevious(c > 1);
        setHasNext(c < Number(res.data.last_page));
        setIsLoading(false);

        console.log(c, next);

        let newPages = [];

        for (let i = 1; i <= res.data.last_page; i++) {
          newPages.push(i);
        }

        setPages(newPages);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <div className="flex items-center justify-center md:justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2 text-primary dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={getSearch}
            className="w-4/5 md:w-1/5 text-primary dark:text-gray-200 py-2 border-b-2 dark:bg-gray-800 border-gray-400 outline-none focus:border-primary dark:focus:border-gray-200"
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col my-5">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-5 text-left text-xs font-medium text-gray-200 uppercase tracking-wider w-1/12"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-5 text-left text-xs font-medium text-gray-200 uppercase tracking-wider w-2/12"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-5 text-left text-xs font-medium text-gray-200 uppercase tracking-wider w-2/12"
                      >
                        Username
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-5 text-left text-xs font-medium text-gray-200 uppercase tracking-wider w-2/12"
                      >
                        CF Handle
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-5 text-left text-xs font-medium text-gray-200 uppercase tracking-wider w-3/12"
                      >
                        University
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-5 text-left text-xs font-medium text-gray-200 uppercase tracking-wider w-2/12"
                      >
                        Score
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-5 text-left text-xs font-medium text-gray-200 uppercase tracking-wider w-2/12"
                      >
                        Streak
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:text-gray-200">
                    {isLoading ? (
                      <div className=" flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      people.map((person, index) => (
                        <tr key={index}>
                          <td className="px-6 py-6 whitespace-nowrap w-1/12 dark:bg-gray-800">
                            <div className="text-sm text-gray-900 dark:text-gray-200">
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap w-2/12 dark:bg-gray-800">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                              {person.first_name} {person.last_name}
                            </div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap w-1/12 dark:bg-gray-800">
                            <div className="text-sm text-gray-900 dark:text-gray-200">
                              {person.username}
                            </div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap w-1/12 dark:bg-gray-800">
                            <div className="text-sm text-gray-900 dark:text-gray-200">
                              {person.profile[0].cf_handle}
                            </div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap w-3/12 dark:bg-gray-800">
                            <div className="text-sm text-gray-900 dark:text-gray-200">
                              {person.profile[0].university}
                            </div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 w-2/12 dark:bg-gray-800">
                            {person.scoreboard[0]?.score || 0}
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap text-sm font-medium w-2/12 text-gray-900 dark:text-gray-200 dark:bg-gray-800">
                            {person.scoreboard[0]?.streak || 0}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <div className="flex items-center space-x-1">
              <button
                className="flex items-center px-4 py-2 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md"
                disabled={!hasPrevious}
                onClick={() => getPage(previous)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 h-6 ${
                    hasPrevious
                      ? "text-primary dark:text-gray-200 "
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  />
                </svg>
              </button>

              {pages.map((page) => {
                return (
                  <button
                    className={`px-4 py-2  ${
                      page === current
                        ? "text-gray-200 bg-primary"
                        : "text-gray-700 dark:text-gray-200 bg-transparent"
                    }  rounded-full hover:bg-gray-500 hover:text-white`}
                    onClick={() => getPage(page)}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                className="px-4 py-2 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md"
                disabled={!hasNext}
                onClick={() => getPage(next)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 h-6 ${
                    hasNext
                      ? "text-primary dark:text-gray-200"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StandingsBody;
