import asyncio
import asyncpg

async def main():
    try:
        conn = await asyncpg.connect("postgresql://postgres:45683968@127.0.0.1:5433/medvision")
        print("Connected!")
    except Exception as e:
        print(f"Error: {repr(e)}")

asyncio.run(main())
