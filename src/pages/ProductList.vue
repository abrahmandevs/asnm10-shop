<script setup>
	import { ref, reactive, onBeforeMount } from "vue"

	import { ShoppingBagIcon } from "@heroicons/vue/24/outline"
	import axios from "axios"
	const products = reactive([])

	onBeforeMount(() => {
		async function productList() {
			const url = "https://dummyjson.com/products?limit=10"
			const res = await axios.get(url)
			if (200 == res.status) {
				res.data.products.forEach((product) => {
					products.push({
						id: product.id,
						title: product.title,
						description: product.description,
						price: product.price,
						images: product.images,
					})
				})
			}
		}
		productList()
	})

	async function lodeMore() {
		const url = "https://dummyjson.com/products?limit=10&skip=10&select=title,description,price,images"
		const res = await axios.get(url)
		if (200 == res.status) {
			res.data.products.forEach((product) => {
				products.push(product)
			})
		}
	}
</script>
<template>
	<section id="" class="px-4 sm:px-12 py-8 sm:py-16">
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
			<div class="p-2 border shadow-md rounded-md relative flex flex-col break-words gap-y-6" v-for="(product, index) in products" :key="index">
				<!-- card haeder -->
				<div class="shrink-0">
					<router-link :to="{ name: 'product', params: { id: product.id } }"><img :src="product['images'].slice(-1)" alt="image" class="w-full h-40 object-contain" /></router-link>
				</div>
				<!-- card body -->
				<div class="flex-auto space-y-3">
					<router-link class="text-xl font-semibold" :to="{ name: 'product', params: { id: product.id } }">{{ product["title"] }}</router-link>
					<p class="text-sm text-gray-400">{{ product["description"] }}</p>
				</div>
				<!-- card footer -->
				<div class="mb-2 flex items-center justify-between">
					<h1 class="font-semibold text-xl text-orange-400">${{ product["price"] }}</h1>
					<router-link class="px-2.5 text-white py-1 rounded shrink-0 flex items-center gap-1 text-sm bg-green-600 hover:bg-green-500" :to="{ name: 'product', params: { id: product.id } }">View</router-link>
					<a href="#" class="px-2.5 text-white py-1 rounded shrink-0 flex items-center gap-1 text-sm bg-blue-600 hover:bg-blue-500">Add To Cart <ShoppingBagIcon class="h-4 w-4" /> </a>
				</div>
			</div>
		</div>
		<div class="mx-auto text-center my-8">
			<button @click="lodeMore()" class="px-4 py-2 rounded-md bg-blue-600 text-white text-center">Lode Mode</button>
		</div>
	</section>
</template>

<style lang="scss" scoped></style>
