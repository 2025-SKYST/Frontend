// lib/chapterService.ts
export interface Chapter {
  id: number;
  chapter_name: string;
  prologue: string;
  epilogue: string;
}

export async function createChapter(
  name: string,
  headers: Record<string, string>
): Promise<Chapter> {
  const res = await fetch(
    "https://api.memory123.store/api/chapters/create",
    {
      method: "POST",
      headers,
      body: JSON.stringify({ name }),
    }
  );
  if (!res.ok) {
    throw new Error(`챕터 생성 실패: ${res.status}`);
  }
  return res.json() as Promise<Chapter>;
}

export async function getChapters(
  headers: Record<string, string>
): Promise<{ chapters: Chapter[] }> {
  const res = await fetch(
    "https://api.memory123.store/api/chapters/get",
    {
      method: "GET",
      headers,
    }
  );
  if (!res.ok) {
    throw new Error(`챕터 목록 조회 실패: ${res.status}`);
  }
  return res.json();
}
