"use client"
import React,{useContext,useState,useEffect} from "react";
import { ListItem, IconButton, Grid, Select, FormControl, InputLabel, TextField, Chip, } from "@mui/material";
import ModalMenu from './ModalMenu'

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';



export default function Search() {

    const {
        tags,
        setTags,
        originTags,
        setOriginTags,
        presets,
        setPresets,
        originPresets,
        setOriginPresets,
        type,
        setType,
    } = useContext(SearchContext);
    const [toggle, setToggle] = useState<boolean>(false);
    const [condition, setCondition] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    const filterTags = () => {
        if (type) {
            setTags({});
            if (search === "") setTags(originTags);
            else Object.keys(originTags).map((tag) => tag.toLowerCase().includes(search) && setTags((prev) => ({ ...prev, [tag]: false })));
        } else {
            setPresets({});
            if (search === "") setPresets(originPresets);
            else Object.keys(originPresets).map((tag) => tag.toLowerCase().includes(search) && setPresets((prev) => ({ ...prev, [tag]: false })));
        }
    };

    const sortTags = () => {
        if (type) {
            setTags({});
            if (condition === "") setTags(originTags);
            else {
                let temp = Object.keys(originTags);
                if (condition === "昇順") {
                    temp = temp.sort((a, b) => (a > b ? 1 : -1));
                } else if (condition === "降順") {
                    temp = temp.sort((a, b) => (a < b ? 1 : -1));
                }
                Object.values(temp).map((data) => setTags((prev) => ({ ...prev, [data]: false })));
            }
        } else {
            setPresets({});
            if (condition === "") setPresets(originPresets);
            else {
                let temp = Object.keys(originPresets);
                if (condition === "昇順") {
                    temp = temp.sort((a, b) => (a > b ? 1 : -1));
                } else if (condition === "降順") {
                    temp = temp.sort((a, b) => (a < b ? 1 : -1));
                }
                Object.values(temp).map((data) => setPresets((prev) => ({ ...prev, [data]: false })));
            }
        }
    };

    useEffect(() => {
        filterTags();
    }, [search]);

    useEffect(() => {
        sortTags();
    }, [condition]);

    return (
        <div>
            <ListItem sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <IconButton disableRipple sx={{ color: "white", padding: "5px", filter: "brightness(60%)" }}>
                    <FilterNoneOutlinedIcon fontSize="small" />
                    <div className={InterNormal.className} style={{ paddingLeft: "1rem", fontSize: "1rem" }}>your Library</div>
                </IconButton>
                <ModalMenu element={['Create a New Preset', 'Create a New Tag']} >
                    <AddOutlinedIcon fontSize="small" />
                </ModalMenu>

            </ListItem>

            <ListItem>
                <Chip
                    label="Tag"
                    onClick={() => setType(true)}
                    variant="outlined"
                    sx={{
                        color: type ? "white" : "#808080",
                        margin: "0 5px 0 5px",
                    }}
                />
                <Chip
                    label="Presets"
                    onClick={() => setType(false)}
                    variant="outlined"
                    sx={{
                        color: type ? "#808080" : "white",
                        margin: "0 5px 0 5px",
                    }}
                />
            </ListItem>
            <ListItem sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>

                <IconButton
                    disableRipple
                    sx={{ color: toggle ? "white" : "#808080" }}
                    onClick={() => {
                        setToggle((prev) => (prev = !prev));
                    }}
                >
                    <SearchOutlinedIcon fontSize="small" />
                </IconButton>
                <TextField
                    InputLabelProps={{
                        style: { color: "#808080" },
                    }}
                    size="small"
                    sx={{ width: "70%", display: toggle === false ? "none" : 'initial', input: { color: "white" } }}
                    color="secondary"
                    focused
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />

                <ModalMenu element={['昇順', '降順']} onClick={(e) => setCondition(e)} >
                    <SortOutlinedIcon fontSize="small" />
                </ModalMenu>


            </ListItem>
        </div>
    )
}