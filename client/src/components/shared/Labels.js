import React from "react";
// css
import "../../styles/components/shared/labels.css";

const Labels = (props) => {
  const { labels, sortLabels, controller, data, projectId } = props;
  const { searchInput, limit } = props.states;

  // sort
  const sort = (element, label) => {
    const sibling =
      element.nextElementSibling || element.previousElementSibling;

    if (element.classList.contains("on")) {
      element.classList.remove("on");
      sibling.classList.add("on");
    } else {
      element.classList.add("on");
      sibling.classList.remove("on");
    }

    controller(data.currentPage, label, limit, searchInput);
  };

  return (
    <div className="labels">
      {labels.map((label, i) => {
        return (
          <div key={i}>
            <p>{label}</p>

            {sortLabels.includes(label) && (
              <>
                <i
                  onClick={(e) => {
                    sort(e.currentTarget, `-${label}`);
                  }}
                  className="on"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0l-8 10h16l-8-10zm3.839 16l-3.839 4.798-3.839-4.798h7.678zm4.161-2h-16l8 10 8-10z" />
                  </svg>
                </i>

                <i
                  onClick={(e) => {
                    sort(e.currentTarget, label);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3.202l3.839 4.798h-7.678l3.839-4.798zm0-3.202l-8 10h16l-8-10zm8 14h-16l8 10 8-10z" />
                  </svg>
                </i>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Labels;
