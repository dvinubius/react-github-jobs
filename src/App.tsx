import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { SearchForm } from "./SearchForm";
import JobsPagination from "./JobsPagination";
import Job from "./Job";
import useFetchJobs from "./useFetchJobs";
import SearchParams from "./models/search_params.model";
import { motion } from "framer-motion";
import "./App.css";

const App: React.FC = () => {
  const [params, setParams] = useState<SearchParams>({
    description: "",
    location: "",
    full_time: "true",
  });
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  const handleParamChange = (param: string, value: string) => {
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };

  return (
    <Container className="App">
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm
        params={params}
        onParamChange={handleParamChange}
      ></SearchForm>
      <JobsPagination
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
      ></JobsPagination>
      <div className="Meat">
        {loading && <motion.h1>Loading...</motion.h1>}
        {error && <motion.h1>Error. Try Refreshing.</motion.h1>}
        {jobs.map((job) => {
          return <Job key={job.id} job={job} />;
        })}
      </div>
      <JobsPagination
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
      ></JobsPagination>
    </Container>
  );
};

export default App;
