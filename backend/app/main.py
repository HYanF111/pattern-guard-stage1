from fastapi import FastAPI, HTTPException
import json
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.database import (
    init_db,
    create_screening_record,
    get_screening_records,
    get_screening_record_by_id,
)
from app.risk_rules import analyze_risk
from app.legal_rules import get_applicable_legal_rules
app = FastAPI(
    title="纹有界 PATTERN GUARD API",
    description="传统纹样版权风险辅助筛查平台开发阶段接口",
    version="0.3.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "https://pattern-guard-demo1-pattern-guard-d3g79so5s20509045.webapps.tcloudbase.com",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ScreeningRecord(BaseModel):
    image_name: str | None = None
    creation_period: str
    image_source: str
    modification_level: str
    usage_scenario: str

    pattern_id: int | None = None
    pattern_name: str | None = None
    source_type: str = "自由上传"


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/")
def root():
    return {"message": "欢迎使用纹有界 PATTERN GUARD API"}


@app.get("/api/v1/health")
def health_check():
    return {
        "status": "ok",
        "service": "pattern-guard-api",
        "message": "纹有界后端已正常运行",
    }


@app.post("/api/v1/screenings")
def create_screening(record: ScreeningRecord):
    try:
        # 将前端表单字段转换为风险规则引擎需要的字段
        form = {
            "era": record.creation_period,
            "source": record.image_source,
            "modification": record.modification_level,
            "usage": record.usage_scenario,
        }

        # 调用风险分析函数，并传入纹样名称
        analysis = analyze_risk(form, record.pattern_name)
       
        # 匹配适用的法律风险规则，不参与风险评分
        analysis["legal_rules"] = get_applicable_legal_rules(form)

        # 保存筛查记录
        record_id = create_screening_record(
            image_name=record.image_name,
            creation_period=record.creation_period,
            image_source=record.image_source,
            modification_level=record.modification_level,
            usage_scenario=record.usage_scenario,
            pattern_id=record.pattern_id,
            pattern_name=record.pattern_name,
            source_type=record.source_type,
            analysis_json=json.dumps(analysis, ensure_ascii=False),
        )

        # 返回保存结果和风险分析结果
        return {
            "message": "筛查记录保存成功",
            "id": record_id,
            "analysis": analysis,
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="筛查记录保存失败或风险分析失败",
        ) from exc

@app.get("/api/v1/screenings")
def list_screenings():
    try:
        records = get_screening_records()

        return {
            "total": len(records),
            "records": records,
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="筛查记录读取失败",
        ) from exc
@app.get("/api/v1/screenings/{record_id}")
def get_screening_detail(record_id: int):
    try:
        record = get_screening_record_by_id(record_id)

        if record is None:
            raise HTTPException(
                status_code=404,
                detail="未找到该筛查记录",
            )

        # 读取数据库中保存的风险分析结果
        analysis_json = record.get("analysis_json")
        analysis = None

        if analysis_json:
            analysis = json.loads(analysis_json)

        return {
            "record": record,
            "analysis": analysis,
        }

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="筛查记录读取失败",
        ) from exc