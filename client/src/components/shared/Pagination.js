import React from "react";
// css
import "../../styles/components/shared/pagination.css";

const Pagination = (props) => {
  const { data, controller, projectId, isArchived } = props;
  const { count, numOfPages, currentPage } = props.data;
  const { limit, searchInput } = props.states;

  const numOfpagesArr = Array.from({ length: numOfPages }, (_, i) => i + 1);

  return (
    <div className="sectionFooter">
      <p className="count">
        {count} out of{" "}
        {data.totalTickets ||
          data.totalProjects ||
          data.totalAssociatedTickets ||
          0}{" "}
        documents
      </p>

      <div className="pagination">
        {numOfPages > 1 && (
          <>
            {currentPage > 1 && (
              <button
                className="prevPage"
                onClick={() => {
                  if (projectId) {
                    controller(
                      projectId,
                      currentPage - 1,
                      "",
                      limit,
                      searchInput
                    );
                  } else {
                    controller(
                      currentPage - 1,
                      "",
                      limit,
                      searchInput,
                      isArchived
                    );
                  }
                }}
              >
                previous
              </button>
            )}

            <div className="pages">
              {numOfpagesArr.map((num) => {
                return (
                  <p
                    key={num}
                    onClick={() => {
                      if (projectId) {
                        controller(projectId, num, "", limit, searchInput);
                      } else {
                        controller(num, "", limit, searchInput, isArchived);
                      }
                    }}
                    className={`${currentPage === num && "viewedPage"}`}
                  >
                    {num}
                  </p>
                );
              })}
            </div>

            {currentPage < numOfPages && (
              <button
                className="nextPage"
                onClick={() => {
                  if (projectId) {
                    controller(
                      projectId,
                      currentPage + 1,
                      "",
                      limit,
                      searchInput
                    );
                  } else {
                    controller(
                      currentPage + 1,
                      "",
                      limit,
                      searchInput,
                      isArchived
                    );
                  }
                }}
              >
                next
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Pagination;
