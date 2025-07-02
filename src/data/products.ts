// src/data/products.ts
import type { Product } from "../types/products";

const products: Product[] = [
    {
        id: 1,
        name: "Headphones",
        price: 1500,
        image: "/images/headphones.jpg",
        category: "Accessories",
        description: "Comfortable headphones with excellent sound clarity for your daily use.",
        rating: 4.5,
        images: ["/images/headphones.jpg",
            "/images/headset1.jpg"
        ]
    },
    {
        id: 2,
        name: "Smartphone",
        price: 20000,
        image: "/images/smartphone.jpg",
        category: "Electronics",
        rating: 4.7,
        description: "Latest smartphone with high-speed performance and crisp display.",
        images: [ "/images/smartphone.jpg"
        ]
    },
    {
        id: 3,
        name: "Watch",
        price: 3000,
        image: "/images/watch.jpg",
        category: "Accessories",
        rating: 4.2,
        description: "Stylish analog watch with waterproof design and durable battery life.",
        images: ["/images/watch.jpg"
        ]
    },
    {
        id: 4,
        name: "Speaker",
        price: 2500,
        image: "/images/speaker.jpg",
        category: "Electronics",
        rating: 4.4,
        description: "Portable speaker with rich bass and Bluetooth connectivity.",
        images: ["/images/speaker.jpg"
        ]
    },
    {
        id: 5,
        name: "AirPods",
        price: 1000,
        image: "/images/airpods.jpg",
        category: "Accessories",
        rating: 4.5,
        description: "Comfortable Airpods with excellent sound clarity for your daily use.",
        images: ["/images/airpods.jpg"
        ]
    },
     {
        id: 6,
        name: "Light Bulb",
        price: 1000,
        image: "/images/lightbulb.jpg",
        category: "Electronics",
        rating: 4.5,
        description: "Energy-efficient LED light bulb with adjustable brightness and color temperature.",
        images: [ "/images/lightbulb.jpg"
        ]
    },
    {
        id: 7,
        name: "Gaming Mouse",
        price: 500,
        image: "/images/gaming mouse.jpg",
        category: "Accessories",
        rating: 4.5,
        description: "High precision gaming mouse with customizable buttons and RGB lighting.",
        images: ["/images/gaming mouse.jpg"
        ]
    },
    {
        id: 8,
        name: "Camera",
        price: 15000,
        image: "/images/camera.jpg",
        category: "Electronics",
        rating: 4.5,
        description: "High-resolution camera with advanced features for photography enthusiasts.",
        images: ["/images/camera.jpg"
        ]
    },
    
];

export default products;
