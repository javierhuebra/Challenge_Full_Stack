cd backend/challenge_back/
docker-compose up -d &&

mvn spring-boot:run &

cd ../../frontend/challenge_front

npm install &&

npm run dev