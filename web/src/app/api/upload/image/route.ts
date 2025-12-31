import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { AUTH_TOKEN_KEY } from '@/const';

const API_URL = process.env.API_URL || 'http://localhost:4000';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_KEY)?.value;

  if (!token) {
    return NextResponse.json({ error: 'Nejste přihlášen' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Failed to parse form data' }, { status: 400 });
  }

  const file = formData.get('image');

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
  }

  const uploadFormData = new FormData();
  uploadFormData.append('image', file);

  const response = await fetch(`${API_URL}/api/upload/image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: uploadFormData,
  });

  const text = await response.text();

  if (!response.ok) {
    let errorMessage = 'Failed to upload image';
    try {
      const error = JSON.parse(text);
      errorMessage = error.error || errorMessage;
    } catch {
      errorMessage = text || errorMessage;
    }
    return NextResponse.json({ error: errorMessage }, { status: response.status });
  }

  try {
    const result = JSON.parse(text);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Invalid response from API' }, { status: 500 });
  }
}
