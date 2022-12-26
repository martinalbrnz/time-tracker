import { Register } from "@shared/models/Register.model";
import { extractDay } from "./dateAdapter";

export function registerToChartByProject(registers: Register[]) {
  let labels: string[] = []
  let datasetLabel: string[] = []

  registers.map((reg) => {
    if (!labels.includes(extractDay(reg.init_date))) {
      labels.push(extractDay(reg.init_date))
    }

    if (!datasetLabel.includes(reg.project.title)) {
      datasetLabel.push(reg.project.title)
    }
  })

  const data = datasetLabel.map(proj => {
    return labels.map((date) => {
      return registers
        .filter(reg => reg.project.title === proj)
        .filter(reg => extractDay(reg.init_date).includes(date))
        .reduce((prev, curr) => prev + curr.hours, 0)
    })
    // .map(item => item !== 0 ? item : null)
  })

  const datasets = data.map((item, i) => {
    return {
      data: data[i],
      label: datasetLabel[i]
    }
  })
  return { labels, datasets }
}

export function clearZeros(datasets: { data: (number | null)[], label: string }[]) {
  return datasets.map((item) => {
    return {
      ...item,
      data: item.data.map((reg) => reg! > 0 ? reg : null)
    }
  })
}

export function formatHoursByProject(datasets: { data: (number | null)[], label: string }[]) {
  return [
    {
      data: datasets.map(dataset => dataset.data.reduce((prev, curr) => prev! + curr!, 0)),
      label: ''
    }
  ]
}

export function accumulateValues(datasets: { data: (number | null)[], label: string }[]) {
  return datasets.map(dataset => {
    let acc = 0
    return {
      ...dataset,
      data: dataset.data.map((dataItem) => acc += dataItem!)
    }
  })
}
