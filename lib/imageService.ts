// lib/imageService.ts

export interface Image {
  id: number;
  file_url: string;
  chapter_id: number;
  user_id: number;
  is_main: boolean;
  content: string;
}

export interface Chapter {
  id: number;
  chapter_name: string;
  prologue: string;
  epilogue: string;
  images: Image[];
}

/**
 * 이미지 생성: multipart/form-data로 파일과 선택적 query, keyword를 전송
 */
export async function createImage(
  chapterId: number | string,
  file: File,
  query: string | null,
  keyword: string | null,
  authHeader: Record<string, string>
): Promise<Image> {
  const form = new FormData();
  form.append("file", file);
  if (query !== null && query !== undefined) {
    form.append("query", query);
  }
  if (keyword !== null && keyword !== undefined) {
    form.append("keyword", keyword);
  }

  const res = await fetch(
    `https://api.memory123.store/api/images/create/${chapterId}`,
    {
      method: "POST",
      headers: {
        ...authHeader,
      },
      credentials: "include",
      body: form,
    }
  );

  if (!res.ok) {
    const detail = await res.json().catch(() => null);
    console.error("createImage error detail:", detail);
    throw new Error(`이미지 생성 실패: ${res.status}`);
  }

  return res.json() as Promise<Image>;
}

/**
 * 챕터의 이미지 리스트만 가져오기
 */
export async function getImages(
  chapterId: number | string,
  authHeader: Record<string, string>
): Promise<Image[]> {
  const res = await fetch(
    `https://api.memory123.store/api/chapters/get/${chapterId}`,
    {
      method: "GET",
      headers: {
        ...authHeader,
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!res.ok) {
    let detail: any = null;
    try {
      detail = await res.json();
    } catch {
      // ignore parse errors
    }
    console.error("getImages error detail:", detail);
    throw new Error(`이미지 목록 조회 실패: ${res.status}`);
  }

  const chapter: Chapter = await res.json();
  return chapter.images;
}
