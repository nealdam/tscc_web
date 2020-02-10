import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField
} from "@material-ui/core";

function createData(id, location, type, time) {
  const image = "https://via.placeholder.com/150x120.jpg";
  return { id, image, location, type, time };
}

const rows = [
  createData("1", "100 ABC Street", "normal", "16:00"),
  createData("2", "101 ABC Street", "normal", "16:00"),
  createData("3", "102 ABC Street", "normal", "16:00"),
  createData("4", "103 ABC Street", "normal", "16:00"),
  createData("5", "104 ABC Street", "normal", "16:00")
];

export default function RequestTable() {
  const [isRequestDetailOpen, setRequestDetailOpen] = React.useState(false);

  const handleRowClick = () => {
    setRequestDetailOpen(true);
  };

  const handleRequestDialogClose = () => {
    setRequestDetailOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="request table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow
                hover
                key={row.id}
                onClick={e => handleRowClick(e, row)}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>
                  <img src={row.image} alt={row.id} />
                </TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "ALL", value: -1 }]}
                count={rows.length}
                rowsPerPage={5}
                page={0}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Dialog
        onClose={handleRequestDialogClose}
        aria-labelledby="request-dialog-title"
        open={isRequestDetailOpen}
      >
        <DialogTitle
          id="request-dialog-title"
          onClose={handleRequestDialogClose}
        >
          \Request number\
        </DialogTitle>
        <DialogContent>
          <Grid container>
              <Grid item xs={5}>
                  <form>
                      <TextField id="type" label="Type" />
                      <TextField id="location" label="Location" />
                      <TextField id="size" label="Size" />
                      <TextField id="time" label="Time" />
                      <TextField id="status" label="Status" />
                      <TextField id="sender" label="Sender" />
                      <Button variant="contained" color="primary">Confirm</Button>
                      <Button variant="contained" color="secondary">Cancel</Button>
                  </form>
              </Grid>
              <Grid item xs={7}>
                    <div><img src="https://via.placeholder.com/300x200.jpg" alt="hinh"/></div>
                    <div><img src="https://via.placeholder.com/300x200.jpg" alt="hinh"/></div>
              </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autofocus onClick={handleRequestDialogClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
