# NavSeek – Wearable AI Navigation Assistant for the Visually Impaired

## Overview
Visually impaired individuals face significant challenges in independent navigation due to limited spatial awareness and the inability to perceive obstacles beyond close range. Traditional assistive tools such as white canes provide only short-range, ground-level detection and fail to provide comprehensive environmental understanding.

NavSeek is a wearable, AI-powered assistive navigation system designed to act as an artificial vision aid. It provides real-time, 180-degree environmental awareness by combining computer vision and proximity sensing. The system converts environmental information into clear, prioritized, and direction-specific audio guidance, enabling safer and more independent navigation.


## Problem Statement
Visually impaired users often struggle with detecting obstacles beyond immediate proximity, lack awareness of left, right, and rear hazards, experience audio overload from excessive alerts, and remain dependent on external assistance for safe navigation.

## Proposed Solution
NavSeek integrates a smartphone-mounted wearable system with AI-based object detection and proximity sensors to provide full situational awareness. The smartphone camera continuously analyzes the forward path using computer vision, while sensors mounted on the left, right, and back detect nearby obstacles outside the camera’s field of view. Sensor and vision data are fused in real time and converted into direction-specific audio feedback.

A web-based control dashboard allows users to customize audio feedback, manage object detection preferences, monitor device status, and review safety logs.

## Key Features
- AI-powered object detection for pedestrians, vehicles, animals, and static obstacles  
- Approximate distance estimation for detected objects  
- Directional audio guidance (front, left, right, back)  
- Object detection preferences to reduce audio overload  
- Accessibility-first, hands-free design  
- Web-based control and monitoring dashboard  

## System Architecture
Wearable sensors and smartphone camera capture environmental data, which is processed through AI and sensor fusion. A Node.js backend communicates with Azure AI and cloud services to manage inference, data storage, and system logic. Processed information is delivered as real-time audio feedback and reflected in the web control dashboard.


## Technology Stack
Frontend: React (Vite), Tailwind CSS, ARIA-compliant accessible UI  
Backend: Node.js, Express.js  
Cloud & AI: Microsoft Azure Computer Vision / Custom Vision, Azure Functions, Azure Cosmos DB, Azure Static Web Apps, Azure AD B2C  

## Getting Started

### Prerequisites
Node.js (v16 or higher) and npm must be installed on your system.

### Clone the Repository
```bash
git clone https://github.com/vrinda2403/navseek.git
cd navseek


