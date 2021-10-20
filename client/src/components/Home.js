import React from "react";
import { Link } from "react-router-dom";
import stats from "../images/undraw_All_the_data_re_hh4w.svg";
import track from "../images/undraw_Developer_activity_re_39tg.svg";
import mentor from "../images/undraw_pair_programming_njlp.svg";
import hero from "../images/undraw_programmer_imem.svg";
import profile from "../images/undraw_Social_bio_re_0t9u.svg";
import others from "../images/undraw_Swipe_profiles_re_tvqm.svg";
import task from "../images/undraw_tasks_re_v2v4.svg";
import trophy from "../images/undraw_winners_ao2o.svg";

function Home() {
  return (
    <div>
      <header className="bg-primary bg-opacity-95 dark:bg-gray-800">
        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-2xl font-semibold text-white uppercase dark:text-white lg:text-3xl">
                  A Place To Track And Improve Your Programming Skills
                </h1>
                <p className="mt-2 text-white dark:text-gray-400">
                  Improve your Competitive Programming skills with our
                  personalized tools at your own pace.
                </p>
                <Link to="/register">
                  <button className="w-full px-3 py-2 mt-6 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-indigo-600 rounded-md lg:w-auto hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="object-fill w-full h-full lg:max-w-2xl"
                src={hero}
                alt="CPorBit-home.svg"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gray-200 dark:bg-gray-700">
        <div className="container px-8 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-1/2 h-1/2 lg:max-w-2xl"
                src={track}
                alt="Catalogue-pana.svg"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">
                  Track your progress
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Solve problems and update here. CPorBit will keep track of all
                  your solved problems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-200 dark:bg-gray-700">
        <div className="container px-8 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">
                  Get personalized problem suggestions
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Our Machine Learning system provides personalized problem
                  suggestions based on your performance.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-1/2 h-1/2 lg:max-w-2xl"
                src={task}
                alt="Catalogue-pana.svg"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-200 dark:bg-gray-700">
        <div className="container px-8 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-1/2 h-1/2 lg:max-w-2xl"
                src={mentor}
                alt="Catalogue-pana.svg"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">
                  Get mentor support
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  You can choose a mentor, or become one. Mentors can suggest
                  problems and topic to improve problem solving skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-200 dark:bg-gray-700">
        <div className="container px-8 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">
                  Get Statistics about your performance
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  We keep track of all your solved problems. Our system provides
                  detailed statistics of a user so that you can find out your
                  strength and weakness, and next algorithm to learn.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-1/2 h-1/2 lg:max-w-2xl"
                src={stats}
                alt="Catalogue-pana.svg"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-200 dark:bg-gray-700">
        <div className="container px-8 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-1/2 h-1/2 lg:max-w-2xl"
                src={trophy}
                alt="Catalogue-pana.svg"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">
                  Earn trophies and badges
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Unlock trophies and badges based on your performance. Show off
                  to others.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-200 dark:bg-gray-700">
        <div className="container px-8 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">
                  Compare with others
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Compare your performance with others. Check leaderboard,
                  profiles and badges to compare your current progress with
                  others.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-1/2 h-1/2 lg:max-w-2xl"
                src={others}
                alt="Catalogue-pana.svg"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-200 dark:bg-gray-700">
        <div className="container px-8 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-1/2 h-1/2 lg:max-w-2xl"
                src={profile}
                alt="Catalogue-pana.svg"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">
                  Share your profile
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  You can share your CPorBit profile anywhere to showoff your
                  performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="bg-white dark:bg-gray-800">
        <div class="px-6 py-6 mx-auto">
          {/* <hr class="h-px my-4 bg-gray-300 border-none dark:bg-gray-700" /> */}

          <div>
            <p class="text-center text-gray-800 dark:text-white">
              ©{" "}
              <b>
                CP<i className="text-secondary">or</i>Bit
              </b>{" "}
              Team 2020 - All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
