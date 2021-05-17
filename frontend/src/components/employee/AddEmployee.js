import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from 'axios'
export default function AddEmployee(props) {
    const [open, setOpen] = React.useState(false);
    let initialState = {
        name: "",
        hourlyRate: 0,
        monthlyWorkingHour: 0,
        allowance: 0,
        deduction: 0
    }
    const [formData, setFormData] = React.useState(initialState)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:8000/employee/addEmployee", formData);
            setOpen(false);
            setFormData(initialState);
            props.employeeAdded(true);
        } catch (e) {
            console.log("Error:", e);
        }
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Employee
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-apartment"
            >
                <DialogTitle id="edit-apartment">Add Employee Detail</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        variant="outlined"
                        margin="dense"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        id="name"
                        label="Employee Name"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        margin="dense"
                        value={formData.hourlyRate}
                        onChange={e => setFormData({ ...formData, hourlyRate: e.target.value })}
                        id="hourlyRate"
                        label="Hourly rate"
                        type="number"
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        margin="dense"
                        value={formData.monthlyWorkingHour}
                        onChange={e => setFormData({ ...formData, monthlyWorkingHour: e.target.value })}
                        id="monthlyWorkingHour"
                        label="Monthly working hour"
                        type="number"
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        margin="dense"
                        value={formData.allowance}
                        onChange={e => setFormData({ ...formData, allowance: e.target.value })}
                        id="allowance"
                        label="Allowance"
                        type="number"
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        margin="dense"
                        value={formData.deduction}
                        onChange={e => setFormData({ ...formData, deduction: e.target.value })}
                        id="deduction"
                        label="Deduction"
                        type="number"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
