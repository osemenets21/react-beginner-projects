import React, { useEffect, useState } from "react";
import "./index.scss";
import { Collection } from "./Collection";

function App() {
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); // Initialize with "All" category

  useEffect(() => {
    try {
      const getData = async () => {
        import("./data.json")
          .then((module) => module.default)
          .then((data) => {
            setCollections(data.collections);
            setCategories(data.categories);
          })
          .catch((error) => {
            console.error("Error loading data.json:", error);
          });
      };

      getData();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="App">
      <h1>My collection of photos</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((category, index) => (
            <li
              onClick={() => setSelectedCategory(category.name)} // Set the selected category name
              className={category.name === selectedCategory ? "active" : ""}
              key={category.name}
            >
              {category.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Search by name"
        />
      </div>
      <div className="content">
        {collections
          .filter((collection) => {
            return (
              (selectedCategory === "All" ||
                collection.category ===
                  categories.findIndex((cat) => cat.name === selectedCategory)) &&
              collection.name.toLowerCase().includes(searchValue.toLowerCase())
            );
          })
          .map((collection, index) => (
            <Collection
              key={index}
              name={collection.name}
              images={collection.photos}
            />
          ))}
      </div>
      
    </div>
  );
}

export default App;
