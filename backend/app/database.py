from pathlib import Path
import sqlite3

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)
DB_PATH = DATA_DIR / "pattern_guard.db"


def init_db() -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS system_checks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                check_name TEXT NOT NULL,
                status TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)

        conn.execute("""
            CREATE TABLE IF NOT EXISTS screening_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image_name TEXT,
                creation_period TEXT NOT NULL,
                image_source TEXT NOT NULL,
                modification_level TEXT NOT NULL,
                usage_scenario TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # 为已有数据库增加纹样关联字段，旧记录不会被删除
        columns = {
            row[1]
            for row in conn.execute(
                "PRAGMA table_info(screening_records)"
            ).fetchall()
        }

        if "pattern_id" not in columns:
            conn.execute("""
                ALTER TABLE screening_records
                ADD COLUMN pattern_id INTEGER
            """)

        if "pattern_name" not in columns:
            conn.execute("""
                ALTER TABLE screening_records
                ADD COLUMN pattern_name TEXT
            """)

        if "source_type" not in columns:
            conn.execute("""
                ALTER TABLE screening_records
                ADD COLUMN source_type TEXT NOT NULL DEFAULT '自由上传'
            """)

        if "analysis_json" not in columns:
            conn.execute("""
                ALTER TABLE screening_records
                ADD COLUMN analysis_json TEXT
            """)

        conn.commit()


def create_screening_record(
    image_name: str | None,
    creation_period: str,
    image_source: str,
    modification_level: str,
    usage_scenario: str,
    pattern_id: int | None = None,
    pattern_name: str | None = None,
    source_type: str = "自由上传",
    analysis_json: str | None = None,
) -> int:
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.execute(
            """
            INSERT INTO screening_records (
                image_name,
                creation_period,
                image_source,
                modification_level,
                usage_scenario,
                pattern_id,
                pattern_name,
                source_type,
                analysis_json
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                image_name,
                creation_period,
                image_source,
                modification_level,
                usage_scenario,
                pattern_id,
                pattern_name,
                source_type,
                analysis_json,
            ),
        )
        conn.commit()
        return cursor.lastrowid


def get_screening_records() -> list[dict]:
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        rows = conn.execute(
            """
            SELECT * FROM screening_records
            ORDER BY created_at DESC, id DESC
            """
        ).fetchall()

        return [dict(row) for row in rows]
def get_screening_record_by_id(record_id: int) -> dict | None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row

        row = conn.execute(
            """
            SELECT * FROM screening_records
            WHERE id = ?
            """,
            (record_id,),
        ).fetchone()

        return dict(row) if row else None