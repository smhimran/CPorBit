import axios from "axios";
import { Chart } from "chart.js";
import "chart.js/auto";
import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useParams } from "react-router-dom";

function ProfileChart() {
  const [profileScore, setProfileScore] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  const { username } = useParams();

  Chart.defaults.color = "#7B95F7";

  useEffect(() => {
    axios
      .get(`/api/standings/profile/${username}/stats/`)
      .then((res) => {
        const scores = res.data.tags;

        let tagNames = [],
          others = 0;

        const data = [];
        for (let i = 0; i < Object.keys(scores).length; i++) {
          let score = scores[Object.keys(scores)[i]].count;
          let percentage = scores[Object.keys(scores)[i]].percentage;

          if (percentage < 2) {
            others += score;
          } else {
            tagNames.push(Object.keys(scores)[i]);
            data.push(score);
          }
        }

        if (others > 0) {
          tagNames.push("Others");
          data.push(others);
        }

        setTags(tagNames);
        setProfileScore(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold dark:text-gray-200 text-center mb-2">
        Statistics
      </h2>
      <div>
        <Doughnut
          data={{
            labels: tags,
            datasets: [
              {
                label: "Solve by Tags",
                data: profileScore,
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 206, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(153, 102, 255)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 105, 132)",
                  "rgb(54, 192, 235)",
                  "rgb(255, 206, 106)",
                  "rgb(95, 172, 192)",
                  "rgb(123, 102, 125)",
                  "rgb(235, 139, 64)",
                  "rgb(245, 199, 132)",
                  "rgb(54, 162, 215)",
                  "rgb(155, 216, 36)",
                  "rgb(255, 206, 46)",
                  "rgb(69, 69, 69)",
                  "rgb(215, 69, 79)",
                  "rgb(125, 116, 176)",
                  "rgb(235, 226, 146)",
                ],
              },
            ],
          }}
          //   width={"100%"}
          height={"400 px"}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            legend: { labels: { fontColor: "#0077DD" } },
            plugins: {
              datalabels: {
                color: "white",
              },
            },
          }}
          className="text-black dark:text-gray-200"
        />
      </div>
    </div>
  );
}

export default ProfileChart;
