"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
	const router = useRouter();
	const searchParams = useSearchParams(); //to search the params for the intended id
	const promptId = searchParams.get("id"); //to get the specific id we want to create the form to store

	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`);
			const data = await response.json();

			setPost({
				prompt: data.prompt,
				tag: data.tag,
			});
		};

		if (promptId) getPromptDetails();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) return alert("Prompt ID not found");
		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});

			console.log(response);
			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type='Edit'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	);
};

export default EditPrompt;
