import { NextResponse } from 'next/server';
import { mutate, roles, type Role } from '@/lib/domain';
// Stateless demo endpoint. Production must load state and membership from the DB/session.
export async function POST(request:Request){try{const {state,role,action,payload}=await request.json();if(!roles.includes(role as Role))return NextResponse.json({error:'Invalid demo role'},{status:400});return NextResponse.json({state:mutate(state,role,action,payload)});}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Invalid request'},{status:400});}}
