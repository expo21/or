import React, { useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "400px",
  },
  input: {
    display: "none",
  },

  titleModal: {
    "& > *": {
      width: "100%",
      margin: "0px 0px 20px 0px",
    },
  },
  titleSelect: {
    "& > *": {
      width: "100%",
      margin: "0px 0px 20px 0px",
    },
  },
  titleFile: {
    marginBottom: "20px",
    "& span": {
      padding: "20px",
      width: "100%",
      background: "#e6e6e6",
    },
    "& p": {
      color: "#000",
      zIndex: "1",
    },
  },

  titleButton: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  GarmentTabel: {
    width: "100%",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function StyleOptions() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = () => {};
  const handleSubmit = () => {};
  return (
    <>
      <PageTitle
        title="Options List"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            onClick={handleOpen}
          >
            Add New Option
          </Button>
        }
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add Option</h2>
            <div className={classes.titleModal}>
              <TextField
                id="standard-basic"
                label="Title"
                name="title"
                // value={newOption.title}
                onChange={handleChange}
                variant="outlined"
              />
            </div>

            <div className={classes.titleModal}>
              <TextField
                // id="outlined-select-currency"
                select
                label="Style Type"
                name="styleType"
                // value={styleType}
                helperText="Select Style Type."
                variant="outlined"
                // value={styleOption}
                // onChange={(e) => setStyleType(e.target.value)}
              >
                {[
                  { label: "Ready Made", value: 0 },
                  { label: "custom", value: 1 },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={classes.titleSelect}>
              <InputLabel id="demo-mutiple-name-label">Garments</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple
                // value={selectedGarments}
                onChange={handleChange}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {/* {[].map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {`${item.title} | ${item.gender}`}
                  </MenuItem>
                ))} */}
              </Select>
            </div>

            <div className={classes.titleButton}>
              <Button variant="outlined">Cancel</Button>
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
