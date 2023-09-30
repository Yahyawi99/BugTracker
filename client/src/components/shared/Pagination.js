import React from "react";
// css
import "../../styles/components/shared/pagination.css";

const Pagination = (props) => {
  const { data, controller } = props;
  const { count, numOfPages, currentPage } = props.data;
  const { limit, searchInput } = props.states;

  const numOfpagesArr = Array.from({ length: numOfPages }, (_, i) => i + 1);

  return (
    <div className="sectionFooter">
      <p className="count">
        {count} out of {data.totalTickets || data.totalProjects} documents
      </p>

      <div className="pagination">
        {numOfPages > 1 && (
          <>
            {currentPage > 1 && (
              <button
                className="prevPage"
                onClick={() =>
                  controller(currentPage - 1, "", limit, searchInput)
                }
              >
                previous
              </button>
            )}

            <div className="pages">
              {numOfpagesArr.map((num) => {
                return (
                  <p
                    key={num}
                    onClick={() => controller(num, "", limit, searchInput)}
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
                onClick={() =>
                  controller(currentPage + 1, "", limit, searchInput)
                }
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
