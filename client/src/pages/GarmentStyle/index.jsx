import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import {
  Button,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

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

const columns = [
  {
    name: "_id",
    label: "ID",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "title",
    label: "Title",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "custom",
    label: "Style Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "garment_type",
    label: "Garment Type",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "options",
    label: "Options",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "status",
    label: "Status",
    options: {
      filter: true,
      sort: true,
    },
  },
];

export default function GarmentStyle() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [garmentList, setGarmentList] = useState([]);
  const [selectedGarments, setSelectedGarments] = useState([]);
  const [styleType, setStyleType] = useState(0);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event) => {
    setSelectedGarments(event.target.value);
  };

  const handleSubmit = () => {
    console.log(selectedGarments);
  };
  const fetchGarmentLIst = () => {
    axios
      .get("http://localhost:3232/api/styleOptions")
      .then((response) => {
        const { status, data } = response.data;
        if (status) {
          console.log(data);
          setGarmentList(data);
        }
      })
      .catch();
  };
  useEffect(() => {
    fetchGarmentLIst();
  }, []);

  const printArray = (arr) => {
    let iterator = arr.values();
    for (let elements of iterator) {
      return elements.title;
    }
  };

  const printChooseStyle = (number) => {
    console.log("chala k nahi");
    if (number === 0) {
      return "ReadyMade";
    } else {
      return "Custom";
    }
  };

  const printStatus = (value) => {
    if (value === 1) {
      return "Enable";
    } else {
      return "Disbale";
    }
  };

  return (
    <>
      <PageTitle
        title="Style List"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            onClick={handleOpen}
          >
            Add Style
          </Button>
        }
      />

      <Grid>
        <Grid item xs={12}>
          <Paper className={classes.GarmentTabel}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {garmentList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.name];
                            return (
                              <TableCell
                                key={column.name}
                                align={column.align}
                                onClick={() => console.log(row)}
                              >
                                {Array.isArray(value)
                                  ? printArray(value)
                                  : column.name === "custom"
                                  ? printChooseStyle(value)
                                  : column.name === "status"
                                  ? printStatus(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={garmentList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
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
              <h2 id="transition-modal-title">Add new Garment Style</h2>
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

              <div className={classes.titleSelect}>
                <TextField
                  // id="outlined-select-currency"
                  select
                  label="Style Type"
                  name="styleType"
                  value={styleType}
                  helperText="Select Style Type."
                  variant="outlined"
                  // value={styleOption}
                  onChange={(e) => setStyleType(e.target.value)}
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
                  value={selectedGarments}
                  onChange={handleChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                  variant="outlined"
                >
                  {garmentList.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {`${item.title} | ${item.gender}`}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div className={classes.titleButton}>
                <Button variant="outlined">Cancel</Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </Grid>
    </>
  );
}
