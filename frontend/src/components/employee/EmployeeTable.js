import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import { Button, Typography } from "@material-ui/core";
import AddEmployee from './AddEmployee'
import axios from 'axios'
import { DeleteOutline } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        width: "auto",
        margin: theme.spacing(2),
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    },
    selectTableCell: {
        width: 60
    },
    tableCell: {
        width: 130,
        height: 40
    },
    input: {
        width: 130,
        height: 40
    },
    header: {
        placeContent: "space-between",
        display: "flex",
        margin: "20px"
    }
}));

const createData = (_id, name, hourlyRate, monthlyWorkingHour, allowance, deduction, payroll) => ({
    _id,
    name,
    hourlyRate,
    monthlyWorkingHour,
    allowance,
    deduction,
    payroll
});

const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = row;
    return (
        <TableCell align="left" className={classes.tableCell}>
            {isEditMode && !["name", "payroll"].includes(name) ? (
                <Input
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                    className={classes.input}
                />
            ) : (
                row[name]
            )}
        </TableCell>
    );
};

export default function EmployeeTable() {
    const [rows, setRows] = React.useState([]);
    const [previous, setPrevious] = React.useState({});
    const [initialData, setInitialData] = React.useState({});
    const [formChanged, setFormChanged] = React.useState({})
    const classes = useStyles();

    useEffect(() => {
        getEmployee();
    }, []);
    const getEmployee = async () => {
        try {
            let employees = await axios.get("http://localhost:8000/employee/getEmployees");
            if (Object.keys(initialData).length === 0) {
                setInitialData(employees.data[0])
            }
            setRows(employees.data.map(item => createData(
                item._id,
                item.name,
                item.hourlyRate,
                item.monthlyWorkingHour,
                item.allowance,
                item.deduction,
                (Number(item.monthlyWorkingHour) * Number(item.hourlyRate)) - (item.allowance + item.deduction))))
        } catch (e) {
            console.log("Error:", e)
        }
    }
    const employeeAdded = (flag) => {
        if (flag)
            getEmployee();
    }
    const onToggleEditMode = async (id) => {
        if (Object.keys(formChanged).length > 0) {
            try {
                await axios.put(`http://localhost:8000/employee/updateEmployees?_id=${id}`, formChanged);
                getEmployee();
                setFormChanged({});
            } catch (e) {
                console.log("Error", e)
            }
        }
        setRows(state => {
            return rows.map(row => {
                if (row._id === id) {
                    return { ...row, isEditMode: !row.isEditMode };
                }
                return row;
            });
        });
    };

    const onChange = (e, row) => {
        if (!previous[row.id]) {
            setPrevious(state => ({ ...state, [row.id]: row }));
        }
        const value = e.target.value;
        const name = e.target.name;
        if (value !== initialData[name]) {
            setFormChanged({ ...formChanged, [name]: value })
        }
        const { id } = row;
        const newRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setRows(newRows);
    };

    const onRevert = id => {
        const newRows = rows.map(row => {
            if (row._id === id) {
                return previous[id] ? previous[id] : row;
            }
            return row;
        });
        setRows(newRows);
        setPrevious(state => {
            delete state[id];
            return state;
        });
        onToggleEditMode(id);
    };
    const deleteEmployee = async id => {
        if (id) {
            try {
                await axios.delete(`http://localhost:8000/employee/deleteEmployees?_id=${id}`);
                getEmployee()
            } catch (e) {
                console.log("Error:", e)
            }
        }
    }
    return (
        <>
            <div className={classes.header}>
                <Typography variant="h4">Employee Table</Typography>
                {/* <Button variant="contained" color="primary">Add Employee</Button> */}
                <AddEmployee employeeAdded={employeeAdded} />
            </div>
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" />
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Hourly Rate</TableCell>
                            <TableCell align="left">Monthly Working Hour</TableCell>
                            <TableCell align="left">Allowance</TableCell>
                            <TableCell align="left">Deduction</TableCell>
                            <TableCell align="left">Payroll</TableCell>
                            <TableCell align="left" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row._id}>
                                <TableCell className={classes.selectTableCell}>
                                    {row.isEditMode ? (
                                        <>
                                            <IconButton
                                                aria-label="done"
                                                onClick={() => onToggleEditMode(row._id)}
                                            >
                                                <DoneIcon />
                                            </IconButton>
                                            {/* <IconButton
                                                aria-label="revert"
                                                onClick={() => onRevert(row._id)}
                                            >
                                                <RevertIcon />
                                            </IconButton> */}
                                        </>
                                    ) : (
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => onToggleEditMode(row._id)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                                <CustomTableCell {...{ row, name: "name", onChange }} />
                                <CustomTableCell {...{ row, name: "hourlyRate", onChange }} />
                                <CustomTableCell {...{ row, name: "monthlyWorkingHour", onChange }} />
                                <CustomTableCell {...{ row, name: "allowance", onChange }} />
                                <CustomTableCell {...{ row, name: "deduction", onChange }} />
                                <CustomTableCell {...{ row, name: "payroll" }} />
                                <TableCell className={classes.selectTableCell}>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => deleteEmployee(row._id)}
                                    >
                                        <DeleteOutline />
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
}
