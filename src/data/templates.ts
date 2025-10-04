import type { StyleTemplate } from '../types'

export const styleTemplates: StyleTemplate[] = [
    {
        id: 'figurine',
        title: '🍌 Desktop figurine style',
        prompt: 'Using the nano-banana model,create a 1/7 scale commercialized figurine of the characters in the picture, in a realistic style, in a real environment. The figurine is placed on a computer desk. The figurine has a round transparent acrylic base, with no text on the base. The content on the computer screen is the Zbrush modeling process of this figurine. Next to the computer screen is a BANDAI-style toy packaging box printed with the original artwork., The packaging features two-dimensional flat illustrations.Maintain consistency with the image',
        image: '/1.png',
        description: 'Transform your character into a collectible figurine complete with professional packaging and production showcase'
    },
    {
        id: 'fastfood-solitude',
        title: '🍔 Solitude in the late-night diner',
        prompt: 'A cinematic scene inside a fast food restaurant at night. Foreground: a lonely table with burgers and fries, and a smartphone shown large and sharp on the table, clearly displaying the uploaded anime/game character image. A hand is reaching for food, symbolizing solitude. Midground: in the blurred background, a couple is sitting together and kiss. One of them is represented as a cosplayer version of the uploaded character: If the uploaded character is humanoid, show accurate cosplay with hairstyle, costume, and signature props. If the uploaded character is non-humanoid (mecha, creature, mascot, etc.), show a gijinka (humanized cosplay interpretation) that carries clear visual cues, costume colors, and props from the reference image (armor pieces, wings, ears, weapon, or iconic accessories). The other person is an ordinary japan human, and they are showing intimate affection (kissing, holding hands, or sharing food). Background: large glass windows, blurred neon city lights outside. Mood: melancholic, bittersweet, ironic, cinematic shallow depth of field. [reference: the uploaded image defines both the smartphone display and the cosplay design, with visible props emphasized] Image size is 585px 1024px',
        image: '/2.png',
        description: 'Place your character in a bittersweet late-night fast food scene that contrasts loneliness with tender moments'
    }
]
