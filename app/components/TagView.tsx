import React from "react";
import { useState, useEffect, useContext, createContext } from "react";
import { db } from "./Firebase";
import { collection, onSnapshot, doc, getDoc } from "@firebase/firestore";
import { List, ListItem, IconButton, Grid, Card, CardContent, CardActionArea, CardMedia, Typography, Table, TableCell, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import AddUrl from "./AddUrl";
import AddTag from "./AddTag";
import UrlCard from "./UrlCard";


const TagView = ({label}:{label?:string}) => {
    interface Tags {
        [key: string]: Array<any>;
    }

    const [urls, setUrls] = useState<Tags>({});

    const value = { urls, setUrls };

    useEffect(() => {
        const unscribe = onSnapshot(collection(db, "User", "test@gmail.com", "Urls"), (snapshot) => {
            const newUrls: { [key: string]: any[] } = {};
            snapshot.forEach((doc) => {
                newUrls[doc.data().url] = [doc.data()];

            });
            setUrls((prev) => ({ ...prev, ...newUrls }));
        });
    }, []);

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <div style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "left",
                margin: "5% 5% 0 5%",

            }}>
                <img
                    src="https://images.unsplash.com/photo-1568781269551-3e3baf5ec909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    style={{
                        borderRadius: "10px",
                        objectFit: "cover",
                        width: "15vw",
                        height: '15vw'
                    }}
                />
                <div style={{ height: '15vw', paddingLeft: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                    <h4 style={{ margin: '0', color: "#808080", fontSize: '1.5rem' }}>Type : Tag</h4>
                    <h1 style={{ margin: '0', color: "white", fontSize: '5rem' }}>{label ? label : 'empty'}</h1>
                    <h4 style={{ margin: '0', color: "#808080", fontSize: '1rem' }}>100 urls</h4>
                </div>
            </div>

            <TableContainer style={{ width: '90%', margin: '5% 5% 0 5%', backgroundColor: "transparent", borderRadius: '10px' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: "#808080", width: 'auto' }}>#</TableCell>
                            <TableCell style={{ color: "white" }} align="left">title</TableCell>
                            <TableCell style={{ color: "white" }} align="left">description</TableCell>
                            <TableCell style={{ color: "#808080" }} align="left">Date Added</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ "&:hover": { backgroundColor: '#454545' } }}>
                            <TableCell style={{ color: "white", width: 'auto' }}>1</TableCell>
                            <TableCell style={{ color: "white", display: 'flex', alignItems: 'center' }} align="left">
                                <div style={{ height: '3vw', width: '3vw', backgroundColor: 'white', borderRadius: '10p', marginRight: '10px' }}></div>
                                <div style={{ display: 'block' }}>
                                    Marigold piano<br></br>
                                    youtube.com
                                </div>
                            </TableCell>
                            <TableCell style={{ color: "white" }} align="left"></TableCell>
                            <TableCell style={{ color: "white" }} align="left">2021/10/10</TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ height: "10vh" }}></div>
        </div>
    );
};

export default TagView;
