import React, { useEffect } from "react";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
// css
import "../../styles/components/shared/limiAndSearch.css";

const LimitAndSearch = (props) => {
  const { controller, currentPage } = props;
  const {
    limit,
    setLimit,
    dropDown,
    setDropDown,
    searchInput,
    setSearchInput,
  } = props.states;

  // limit
  const changeLimit = (element) => {
    if (element.dataset.value) {
      setLimit(element.dataset.value);
      setDropDown(false);
    }
  };

  useEffect(() => {
    controller(currentPage, "", limit, searchInput);
  }, [limit]);

  // search
  const search = () => {
    controller(1, "", limit, searchInput);
  };

  //   *************************************
  return (
    <div className="sectionHeader">
      <div className="limitControl">
        <p>show</p>

        <div className="dropdownContainer">
          <p className="dropDownValue">
            <span>{limit}</span>

            <i onClick={() => setDropDown(!dropDown)}>
              <FontAwesomeIcon icon={faChevronDown} />
            </i>
          </p>

          <div
            className={`${dropDown && "showDropDown"} dropDown`}
            onClick={(e) => changeLimit(e.target)}
          >
            <p data-value="3">3</p>
            <p data-value="5">5</p>
            <p data-value="10">10</p>
          </div>
        </div>
        <p>documents</p>
      </div>

      <div className="searchBar">
        <p>search :</p>

        <input
          type="text"
          onChange={(e) => setSearchInput(e.currentTarget.value)}
        />

        <button type="button" onClick={search}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};

export default LimitAndSearch;
