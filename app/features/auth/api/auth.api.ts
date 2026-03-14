import type { SupabaseClient } from '@supabase/supabase-js';

export const signIn = async (
	supabase: SupabaseClient,
	email: string,
	password: string
): Promise<void> => {
	const { error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) {
		throw error;
	}
};

export const signUp = async (
	supabase: SupabaseClient,
	email: string,
	password: string,
	fullName: string
): Promise<void> => {
	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				full_name: fullName,
			},
		},
	});

	if (error) {
		throw error;
	}
};

export const signOut = async (supabase: SupabaseClient): Promise<void> => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw error;
	}
};
