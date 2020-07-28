import { useQuery } from "@apollo/client";
import Badge from "@atlaskit/badge";
import React from "react";
import Loader from "react-loader-spinner";
import { GET_LABELS } from "../../graphql/queries.js";
import { GrayHeading } from "../styled/Heading";
import LabelForm from "./LabelForm";
import LabelsList from "./LabelsList";

function Labels(props) {
  const { loading, error, data } = useQuery(GET_LABELS);

  if (loading) {
    console.log("loading");
    return <Loader type="Oval" color="#00BFFF" height={80} width={80} />;
  }
  if (error) {
    console.error("error");
    console.error(error);
    return <div>Error!</div>;
  }
  const labels = data.labels;
  return (
    <>
      <LabelForm />
      <GrayHeading>
        Labels <Badge> {labels.length}</Badge>
      </GrayHeading>
      <LabelsList labels={labels} />
    </>
  );
}

export default Labels;
