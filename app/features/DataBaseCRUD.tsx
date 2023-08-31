'use client'
import React,{useState,useEffect} from 'react';
import {db} from '../lib/FireBase';
import { collection, onSnapshot, doc, getDoc } from "@firebase/firestore";


