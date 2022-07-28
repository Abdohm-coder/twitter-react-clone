import "./Widgets.css";
import { TwitterTweetEmbed } from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";

export default function Widgets() {
  const data = [
    {
      userImg: "https://rb.gy/urakiy",
      username: "SpaceX",
      tag: "@SpaceX",
      href: "https://twitter.com/SpaceX",
    },
    {
      userImg: "https://rb.gy/aluxgh",
      username: "Elon Musk",
      tag: "@elonmusk",
      href: "https://twitter.com/elonmusk",
    },
    {
      userImg: "https://rb.gy/zyvazm",
      username: "Tesla",
      tag: "@Tesla",
      href: "https://twitter.com/tesla",
    },
  ];

  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input type="text" placeholder="Search Twitter" />
      </div>

      <div className="widgets__widgetContainer">
        <div className="widgets__news">
          <h4>What's happening</h4>
          <TwitterTweetEmbed
            tweetId={"1458035066957881345"}
            height={300}
            style={{ border: "none" }}
          />
        </div>

        <div className="widgets__follow">
          <h4>Who to follow</h4>
          {data.map((result, index) => (
            <a href={result.href} target={"_blank"} key={index}>
              <div className="following__item">
                <img
                  src={result.userImg}
                  alt={result.username}
                  className="widgets__followUserImage"
                />
                <div className="widgets__followUserText">
                  <h4>{result.username}</h4>
                  <h5>{result.tag}</h5>
                </div>
                <button>Follow</button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
