#!/bin/bash

echo "🧪 Testing API Endpoints"
echo "========================="

echo ""
echo "1️⃣ Testing Health Check..."
curl -s "http://localhost:3001/api/health" | python3 -m json.tool

echo ""
echo "2️⃣ Testing OpenRouter Connection..."
curl -s "http://localhost:3001/api/test-openai" | python3 -m json.tool

echo ""
echo "3️⃣ Testing Writer API..."
curl -X POST "http://localhost:3001/api/write" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"写一篇关于人工智能发展的简短文章","tone":"professional","length":"short"}' \
  | python3 -m json.tool

echo ""
echo "✨ API tests completed!"
echo ""
echo "🌐 Frontend URL: http://localhost:8080"
echo "🔧 API Server URL: http://localhost:3001"