import { useState } from "react";
import emailjs from "emailjs-com";
/////material//////
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
///BootStrap
import { Button, Form, Alert } from "react-bootstrap";
/////redux///
import { useDispatch } from "react-redux";
import { setSnackBar } from "../../redux/slices/snackbar";

const useStyles = makeStyles({
  input: {
    backgroundColor: "var(--input-color)",
    color: "white",
  },
  card: {
    backgroundColor: "var(--main-color-regular)",
    borderRadius: "10px",
    minWidth: "370px",
    padding: "30px",
  },
});
export const ContactButton = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpen] = useState(false);
  const dispatch = useDispatch();

  const openHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const endEmailHandler = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      await emailjs.sendForm(
        "service_fj5z5xs",
        "template_27tiq5f",
        event.target,
        "user_ApcvhPy4sroEuFHXvMR7G"
      );
      setLoading(false);
      setOpen(false);
      dispatch(
        setSnackBar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage:
            "Thank you for contacting us, we're really appreciate it",
        })
      );
    } catch (err) {
      setLoading(false);
      setError("Oops something went wrong, try sending again.");
    }
  };

  return (
    <>
      <div style={{ marginLeft: "5px" }} onClick={openHandler}>
        Contact us
      </div>
      <Modal
        open={openModal}
        className="w-100 d-flex align-items-center justify-content-center"
        onClose={closeHandler}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 810 }}
      >
        <Fade in={openModal}>
          <Form onSubmit={endEmailHandler}>
            <Grid
              container
              direction="column"
              spacing={5}
              className={classes.card}
            >
              <div style={{ color: "white" }}>
                <Form.Group>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    className={classes.input}
                    required
                    name="subject"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    className={classes.input}
                    required
                    name="name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className={classes.input}
                    required
                    type="email"
                    name="email"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    type="text"
                    className={classes.input}
                    required
                    as="textarea"
                    rows={3}
                    name="message"
                  />
                </Form.Group>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button
                value="Send"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                Send
              </Button>
            </Grid>
          </Form>
        </Fade>
      </Modal>
    </>
  );
};
