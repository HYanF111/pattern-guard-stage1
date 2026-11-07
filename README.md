# 纹有界 · PATTERN GUARD（第一阶段）

第一阶段可运行项目骨架：Vue 3 + TypeScript 前端、Python FastAPI 后端、SQLite 数据库。

## 启动后端（终端一）
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
后端健康检查：http://127.0.0.1:8000/api/v1/health
API 文档：http://127.0.0.1:8000/docs

## 启动前端（终端二）
```powershell
cd frontend
npm install
npm run dev
```
默认网页地址：http://127.0.0.1:5173

当前仅实现首页、前后端连接检查和 SQLite 初始化，尚未实现真实版权风险判断。页面纹样为原创几何装饰示意，不代表馆藏资料。产品不提供法律意见或授权结论。
