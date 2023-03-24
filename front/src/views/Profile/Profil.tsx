import { useEffect, useState } from "react";
import Post from "../../components/shared/Post";
import styles from "./Profil.module.scss";

import { IPost } from "../../utils/Interface/Post";
import apiBack from "../../utils/axios-api";
import {
	ActionIcon,
	Avatar,
	Group,
	Loader,
	Tabs,
	TextInput,
} from "@mantine/core";
import {
	IconAlbum,
	IconFilter,
	IconMessageCircle,
	IconSearch,
	IconThumbUp,
} from "@tabler/icons";
import { useAuthUser } from "../../hooks/useAuthUser";

const DOMPurify = require("dompurify");

const Profil = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isUpdate, setUpdate] = useState(false);
	//useAuth
	const AuthId = useAuthUser();

	useEffect(() => {
		apiBack
			.get("/post")
			.then((response) => {
				setTimeout(() => {
					setPosts(response.data.reverse());
					setIsLoading(false);
				}, 1000);
			})
			.catch((error: Error) => {
				console.log(error);
			});
		setUpdate(false);
	}, [isUpdate]);

	return (
		<div className="relative">
			<div className={styles.banner}>
				<div className="absolute left-4 -bottom-8 rounded-full bg-white">
					<Avatar size="xl" color="gray" className="rounded-full" />
				</div>
				<div className="absolute top-2/3 left-32">
					<span className="text-4xl font-semibold text-white">John Doe</span>
				</div>
			</div>
			<div className={styles.container}>
				<h2 className="text-center">Vos Post</h2>

				<Group className="mb-3" position="apart">
					<TextInput
						className="flex-grow"
						placeholder="Rechercher un post..."
						radius="lg"
						icon={<IconSearch size={14} stroke={1.5} />}
						// TODO: Search bar doesn't work
					/>

					<ActionIcon variant="light">
						<IconFilter size={36} stroke={1.5} />
					</ActionIcon>
				</Group>

				<Tabs color="dark" radius="md" defaultValue="gallery">
					<Tabs.List>
						<Tabs.Tab value="gallery" icon={<IconAlbum size={14} />}>
							Mes posts
						</Tabs.Tab>
						<Tabs.Tab value="liked" icon={<IconThumbUp size={14} />}>
							Aimés
						</Tabs.Tab>
						<Tabs.Tab value="comments" icon={<IconMessageCircle size={14} />}>
							Commentés
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="gallery" pt="xs">
						<div className={styles.postContainer}>
							{isLoading && (
								<Loader
									className="self-center"
									color="dark"
									variant="dots"
									size="xl"
								/>
							)}
							{posts ? (
								posts
									.filter((post: IPost) => post.userId === AuthId)
									.sort((a, b) => {
										return (
											new Date(b.createdAt).getTime() -
											new Date(a.createdAt).getTime()
										);
									})
									.map((post: IPost) => (
										<Post
											key={post.id}
											createdAt={post.createdAt}
											updatedAt={post.updatedAt}
											userPostId={post.userId}
											id={post.id}
											firstName={post.user.firstname}
											lastName={post.user.lastname}
											date={post.createdAt}
											nbComments={post.postComments.length}
											likes={post.postLikes}
											content={DOMPurify.sanitize(post.htmlContent)}
											profilPicture={post.avatarS3Key}
											setUpdate={setUpdate}
										/>
									))
							) : (
								<p>Vous n'avez pas encore de publication</p>
							)}
						</div>
					</Tabs.Panel>

					<Tabs.Panel value="liked" pt="xs">
						<div className={styles.postContainer}>
							{isLoading && (
								<Loader
									className="self-center"
									color="dark"
									variant="dots"
									size="xl"
								/>
							)}
							{posts ? (
								posts
									.sort((a, b) => {
										return (
											new Date(b.createdAt).getTime() -
											new Date(a.createdAt).getTime()
										);
									})
									// filter liked by userId 18
									.filter((post: IPost) =>
										post.postLikes.some((like) => like.userId === AuthId),
									)
									.map((post: IPost) => (
										<Post
											key={post.id}
											createdAt={post.createdAt}
											updatedAt={post.updatedAt}
											userPostId={post.userId}
											id={post.id}
											firstName={post.user.firstname}
											lastName={post.user.lastname}
											date={post.createdAt}
											nbComments={post.postComments.length}
											likes={post.postLikes}
											content={DOMPurify.sanitize(post.htmlContent)}
											profilPicture={post.avatarS3Key}
											setUpdate={setUpdate}
										/>
									))
							) : (
								<p>Vous n'avez pas encore aimé de publication</p>
							)}
						</div>
					</Tabs.Panel>

					<Tabs.Panel value="comments" pt="xs">
						<div className={styles.postContainer}>
							{isLoading && (
								<Loader
									className="self-center"
									color="dark"
									variant="dots"
									size="xl"
								/>
							)}
							{posts ? (
								posts
									.sort((a, b) => {
										return (
											new Date(b.createdAt).getTime() -
											new Date(a.createdAt).getTime()
										);
									})
									// filter commented by userId 18
									.filter((post: IPost) => {
										return post.postComments.some(
											(comment) => comment.userId === AuthId,
										);
									})
									.map((post: IPost) => (
										<Post
											key={post.id}
											createdAt={post.createdAt}
											updatedAt={post.updatedAt}
											userPostId={post.userId}
											id={post.id}
											firstName={post.user.firstname}
											lastName={post.user.lastname}
											date={post.createdAt}
											nbComments={post.postComments.length}
											likes={post.postLikes}
											content={DOMPurify.sanitize(post.htmlContent)}
											profilPicture={post.avatarS3Key}
											setUpdate={setUpdate}
										/>
									))
							) : (
								<p>Vous n'avez pas encore commenté de publication</p>
							)}
						</div>
					</Tabs.Panel>
				</Tabs>
			</div>
		</div>
	);
};

export default Profil;
