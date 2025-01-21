import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const params = useParams();
  const navigate = useNavigate();

  const { data, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
  const { mutate, isPending: isMutatePending } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newEvent = data.event;
      await queryClient.cancelQueries({queryKey:["events", params.id]});
      const previousEvent = queryClient.getQueryData(["events", params.id]);
      queryClient.setQueryData(["events", params.id], newEvent);

      return {previousEvent};
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", params.id], context.previousEvent);
      window.alert("Failed to update event, something went wrong.")
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", params.id]);
    },
  });

  function handleSubmit(formData) {
    mutate({ event: formData, id: params.id });
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Unable to fetch event."
          message={
            error.info?.message ||
            "Unable to fetch event, please try again later."
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {!isMutatePending && (
          <Link to="../" className="button-text">
            Cancel
          </Link>
        )}
        <button
          type="submit"
          className={isMutatePending ? "button-submit" : "button"}
        >
          {isMutatePending ? "Updating" : "Update"}
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

// alternative method to fetch event by react router, personally doesn't prefer this method
export function loader({params}) {
  return queryClient.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

// alternative method to update event by react router, personally doesn't prefer this method
export async function action({request, params}) {
  const formData = await request.formData();
  const updatedEvent = Object.fromEntries(formData);
  await updateEvent({id: params.id, event: updatedEvent});
  await queryClient.invalidateQueries(["events"]);
  return redirect("../")
}

// For how to implement the code by using react router, refer to Course 425