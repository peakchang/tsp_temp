<script>
    import axios from "axios";
    import { back_api } from "$src/lib/const";
    import { invalidateAll } from "$app/navigation";
    export let data;
    $: data, setData();

    let readyList = [];

    function setData() {
        readyList = data.ready_list;
    }

    async function upload_content() {
        if (!confirm("이거 맞음? 체크 한번만!!")) {
            return;
        }
        try {
            const res = await axios.post(`${back_api}/board/upload_ready`, {
                id: this.value,
            });
            if (res.status == 200) {
                invalidateAll();
            }
        } catch (error) {}
    }
</script>

<table class="w-full">
    <tr>
        <th class="border p-1 w-3/4">제목</th>
        <th class="border p-1 w-1/4">업로드</th>
    </tr>

    {#each readyList as data}
        <tr class="">
            <td class="border p-2">{data.bo_subject}</td>
            <td class="border p-2 text-center">
                <button
                    class="w-28 bg-blue-400 p-1.5 rounded-lg text-white"
                    value={data.bo_id}
                    on:click={upload_content}
                >
                    업로드!!
                </button>
            </td>
        </tr>
    {/each}
</table>
