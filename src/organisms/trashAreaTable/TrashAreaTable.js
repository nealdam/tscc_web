import { Button, Checkbox, makeStyles, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, FormControl, InputLabel, Select, MenuItem, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { trashAreaHeadCells } from '../../constants/headCells';
import EnhancedTableHead from '../../molecule/enhancedTableHead/EnhancedTableHead';
import CreateIcon from '@material-ui/icons/Create';
import TrashAreaDetailDialog from '../dialog/TrashAreaDetailDialog';
import { isToday } from '../../utils/dateUtil';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}))

function TrashAreaTable(props) {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('numberOfRequest');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { trashAreas, selected, setSelected } = props;

    const [cities, setCities] = useState(['']);
    const [selectedCity, setSelectedCity] = useState('');

    const [districts, setDistricts] = useState(['']);
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const [displayTrashAreas, setDisplayTrashAreas] = useState([]);

    const [trashAreaDetail, setTrashAreaDetail] = useState({});
    const [isOpenTrashAreaDetail, setIsOpenTrashAreaDetail] = useState(false);

    useEffect(() => {
        getCities();
        getDistricts();
    }, []);

    const getCities = () => {
        let newCities = [];

        trashAreas.map((trashArea) => {
            if (!(newCities.includes(trashArea.city))) {
                newCities = newCities.concat(trashArea.city);
            }
        })
        setCities(newCities);
        setSelectedCity(newCities[0]);
    }

    const getDistricts = () => {
        let newDistricts = [];

        trashAreas.map((trashArea) => {
            if (!(newDistricts.includes(trashArea.district))) {
                newDistricts = newDistricts.concat(trashArea.district);
            }
        })
        setDistricts(newDistricts);
        setSelectedDistrict(newDistricts[0]);
        setNewDistrict(newDistricts[0]);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const handleCityChange = (event) => {
        console.log(event.target.value);
    }

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
        setNewDistrict(event.target.value);
    }

    const setNewDistrict = (district) => {
        let newDisplayTrashArea = [];

        trashAreas.map(trashArea => {
            if (trashArea.district === district) {
                newDisplayTrashArea.push(trashArea);
            }
        })

        setDisplayTrashAreas(newDisplayTrashArea);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = trashAreas.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    const handleRowClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleDetailClick = (trashArea) => {
        setTrashAreaDetail(trashArea);
        setIsOpenTrashAreaDetail(true);
    }

    const isSelected = (street) => selected.indexOf(street) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, trashAreas.length - page * rowsPerPage);


    const classes = useStyles();

    return (
        <div>
            {/* <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>City</InputLabel>
                <Select
                    value={selectedCity}
                    label="City"
                    onChange={handleCityChange}
                >
                    {cities.map((city) => (
                        <MenuItem key={city} value={city}>
                            {city}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl> */}
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>District</InputLabel>
                <Select
                    value={selectedDistrict}
                    label="District"
                    onChange={handleDistrictChange}
                >
                    {districts.map((district) => (
                        <MenuItem key={district} value={district}>
                            {district}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TableContainer>
                <Table
                    className={classes.table}
                    size={'medium'}
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={displayTrashAreas.length}
                        headCells={trashAreaHeadCells}
                    />
                    <TableBody>
                        {stableSort(displayTrashAreas, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                const d = new Date(row.createAt);
                                let date = d.toLocaleString();

                                if (isToday(d)) {
                                    date = d.toLocaleTimeString();
                                }

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                onClick={(event) => handleRowClick(event, row.id)}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell align="left" padding="none">{row.street}</TableCell>
                                        <TableCell align="left">{row.size.name}</TableCell>
                                        <TableCell align="left">{row.width.name}</TableCell>
                                        <TableCell align="left">{row.type.name}</TableCell>
                                        <TableCell align="center">{row.numberOfRequest}</TableCell>
                                        <TableCell align="left">{date}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="default"
                                                component="span"
                                                onClick={() => handleDetailClick(row)}
                                            >
                                                <CreateIcon />
                                            </IconButton>
                                        </TableCell>
                                        {/* <TableCell align="left">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={(event) => handleDetailClick(event)}
                                            >
                                                Detail
                                            </Button>
                                        </TableCell> */}
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={trashAreas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
            />
            {isOpenTrashAreaDetail &&
                <TrashAreaDetailDialog
                    open={isOpenTrashAreaDetail}
                    setOpen={setIsOpenTrashAreaDetail}
                    trashArea={trashAreaDetail}
                />
            }

        </div>
    )
}

TrashAreaTable.propTypes = {
    trashAreas: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    setSelected: PropTypes.func.isRequired,
}

export default TrashAreaTable;