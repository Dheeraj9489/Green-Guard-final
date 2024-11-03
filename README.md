# Green-Guard

## Inspiration
Green Guard was inspired by our personal experiences with growing crops and the challenges that our family members, who are farmers, encounter every day. We know firsthand how crucial it is to maintain healthy crops for a successful harvest and the overall well-being of farming communities.

According to the Food and Agriculture Organization (FAO), up to 25% of global crop yields are lost to diseases each year, making it really essential for farmers to identify and address these issues promptly.

By allowing users to scan their plants for health issues, Green Guard not only provides insights but also fosters a sense of community. Farmers can share their findings with neighbors, creating a collaborative network that supports everyone in the area. Our goal is to help farmers and locals protect their crops and strengthen the agricultural community. With Green Guard, we're building a brighter future for farming—one where technology and community come together.

## What it does
Green Guard is here to help farmers and communities keep crops healthy and thriving. With just a quick scan of their plants, users can spot potential diseases early on, giving them a chance to take action before things get worse.

When a disease is detected, farmers can easily share their findings with neighbors. With a shared map, everyone can see where issues are popping up in the area, making it easier to tackle problems together. 

## How we built it
Python and PyTorch: We used Python with PyTorch to create a machine learning model that can detect plant diseases. This model quickly analyzes images to spot signs of disease on leaves.

Kaggle: Kaggle provided us with a large collection of plant disease images to train our model. This helped make Green Guard more accurate at recognizing different crop diseases.

React Native: For our mobile app, we used React Native. This lets Green Guard work smoothly on both Android and iOS, making it easy for users to scan plants on any device.

TypeScript: We used TypeScript to keep our code organized and reduce errors, helping us build a stable app that’s easy to improve over time.

Flask: Flask runs on our backend, connecting the app to the machine learning model. It processes images from the app and sends back results in real time.

GitHub: GitHub helped us collaborate as a team, track changes, and make updates to the code.

## Challenges we ran into
We faced several challenges while building Green Guard. Finding clean, ready-to-use data for plant disease detection was difficult, so we had to spend time organizing and refining the datasets ourselves. Communicating smoothly between our mobile app (front end) and backend server also presented issues; we encountered formatting and data-handling glitches that required troubleshooting. Since it was our first time working with React Native and TypeScript, there was a steep learning curve, and we had to quickly adapt to new concepts and workflows. Additionally, we had limited resources for training our machine learning model, with restricted access to powerful cloud computing and tight time constraints, so we had to maximize the efficiency of our training process. 

## Accomplishments that we're proud of
We encountered several challenges while building Green Guard. Finding clean, ready-to-use data for plant disease detection was difficult, so we spent time refining the datasets to meet our needs. We also faced issues with communication between the front end (our mobile app) and backend server, dealing with data formatting and handling errors that required debugging. Additionally, it was our first time using React Native and TypeScript, so we had to learn these technologies on the go. Limited resources for training our machine learning model also posed challenges, as we had restricted access to powerful cloud computing and limited training time.

## What we learned
These challenges taught us valuable lessons. We learned how to clean and prepare data efficiently when ideal datasets aren’t available. We also gained experience in managing data communication between a mobile app and server, improving our troubleshooting skills along the way. Learning React Native and TypeScript under tight deadlines helped us become more adaptable and better at learning new technologies quickly. Finally, working with limited resources forced us to optimize our model training and make the most of what we had, teaching us the importance of resourcefulness in tech projects.

## What's next for Green Guard
We’re aiming to launch Green Guard on the app stores, making it easily accessible for farmers, gardeners, and communities who want to keep their crops healthy. Our next steps include refining the app’s disease detection accuracy, adding more plant varieties, and improving the user experience to ensure the app is intuitive and helpful. We also plan to incorporate community-driven features that allow users to share crop health information, promote collaboration and awareness among local growers. With these updates, Green Guard can become a valuable tool in supporting sustainable and resilient agriculture.

##Works Cited
Christofel04. Tomatoes Diseases Dataset. Kaggle, 2022, https://www.kaggle.com/datasets/christofel04/tomatoes-diseases-dataset.