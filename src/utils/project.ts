import { IProduct } from "@/types";
import item1 from '@/images/image.png'
import item2 from '@/images/image (1).png'
import item3 from '@/images/image (2).png'
import item4 from '@/images/image (3).png'
import item5 from '@/images/image (4).png'
import item6 from '@/images/image (5).png'
import ic1 from '@/images/projects/image.png'
import ic2 from '@/images/projects/image (1).png'
import ic3 from '@/images/projects/image (2).png'
import ic4 from '@/images/projects/image (3).png'
import ic5 from '@/images/projects/image (4).png'
import ic6 from '@/images/projects/image (5).png'
// images
import project1 from '@/images/projects/image1.png'
import project2 from '@/images/projects/image1.1.png'
import project3 from '@/images/projects/image1.2.png'
import project4 from '@/images/projects/image1.3.png'

import pr5 from '@/images/projects/pr2.png'
import pr6 from '@/images/projects/pr3.png'
import pr7 from '@/images/projects/pr4.png'
import pr8 from '@/images/projects/pr5.png'


import pr9 from '@/images/projects/pr9.png'
import pr10 from '@/images/projects/pr10.png'
import pr11 from '@/images/projects/pr11.png'
import pr12 from '@/images/projects/pr12.png'

import pr13 from '@/images/projects/pr13.png'
import pr14 from '@/images/projects/pr14.png'
import pr15 from '@/images/projects/pr15.png'
import pr16 from '@/images/projects/pr16.png'

import pr17 from '@/images/projects/pr17.png'
import pr18 from '@/images/projects/pr18.png'
import pr19 from '@/images/projects/pr19.png'
import pr20 from '@/images/projects/pr20.png'

import pr21 from '@/images/projects/pr21.png'
import pr22 from '@/images/projects/pr22.png'
import pr23 from '@/images/projects/pr23.png'
import pr24 from '@/images/projects/pr24.png'


export const products: IProduct[] = [
    {
        id: 1,
        thumbnail: project1,
        logo: ic1,
        type: "Online",
        title: "GeneFlow",
        desc: "Revolutionizing Healthcare with Blockchain-Backed Genetic Data",
        category: ["Blockchain", "Genomics", "Data Privacy"],
        gallery: [project1, project2, project3, project4]
    },
    {
        id: 2,
        thumbnail: pr5,
        logo: ic2,
        type: "Online",
        title: "OpenSpace",
        desc: "Building a Transparent Food Supply with Blockchain for Agriculture",
        category: ["Blockchain", "Data", "Agriculture"],
        gallery: [pr5, pr6, pr7, pr8]
    },
    {
        id: 3,
        thumbnail: pr9,
        logo: ic3,
        type: "Worldwide",
        title: "NeuroLedger",
        desc: "Using Blockchain to Secure and Share Neuroscience Data Globally",
        category: ["Neuroscience", "Data Sharing", "NFT"],
        gallery: [pr9, pr10, pr11, pr12]
    },
    {
        id: 4,
        thumbnail: pr13,
        logo: ic4,
        type: "Worldwide",
        title: "HelixDAO",
        desc: "Decentralized healthcare platform",
        category: ["Health", "Blockchain", "DeFi"],
        gallery: [pr13, pr14, pr15, pr16]
    },
    {
        id: 5,
        thumbnail: pr17,
        logo: ic5,
        type: "Decentralized",
        title: "Preprints",
        desc: "BioVerse",
        category: ["Publication", "Research", "Decentralized"],
        gallery: [pr17, pr18, pr19, pr20]
    },
    {
        id: 6,
        thumbnail: pr21,
        logo: ic6,
        type: "Ras Al-Khaimah",
        title: "CellBlock",
        desc: "An AI Health App that Saves Lives",
        category: ["AI", "Healthcare", "Technology"],
        gallery: [pr21, pr22, pr23, pr24]
    }
];

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}