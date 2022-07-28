import Sidebar from "./components/Siderbar/Sidebar";
import Feed from "./components/Feed/Feed";
import Widgets from "./components/Widgets/Widgets";
import Login from "./components/Login/Login";
import ShowImage from "./components/ShowImage/ShowImage";
import { useStateValue } from "./StateProvider";
import { useState, createContext } from "react";
import "./App.css";

export const DataContext = createContext();

export default function App() {
  const [{ user }] = useStateValue();

  const [displayImage, setDisplayImage] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <DataContext.Provider
          value={{ displayImage, imageSrc, setDisplayImage, setImageSrc }}>
          <ShowImage />
          <div className="app__body">
            <Sidebar />
            <Feed />
            <Widgets />
          </div>
        </DataContext.Provider>
      )}
    </div>
  );
}
